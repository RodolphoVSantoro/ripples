#![deny(clippy::implicit_return)]
#![allow(clippy::needless_return)]
use curl_parser::ParsedRequest;
use serde::Serialize;
use std::{collections::HashMap, error::Error, fs, path::Path};

#[derive(Serialize, Debug)]
pub struct StringRequest {
    url: String,
    method: String,
    body: String,
    headers: HashMap<String, String>,
}

#[derive(Serialize, Debug, Clone)]
struct File {
    name: String,
    path: String,
}

#[derive(Serialize, Debug)]
pub struct FileTree {
    folder_paths: Vec<FileTree>,
    files: Vec<File>,
    current_path: String,
    current_name: String,
}
struct JSONWorksPaceFileStore {
    file_refs: HashMap<String, Option<String>>,
    file_tree: Option<Box<FileTree>>,
}

pub struct JSONWorksPace {
    location: String,
    file_store: JSONWorksPaceFileStore,
}

#[derive(Debug)]
struct FileTreeLoadingError(&'static str);

impl std::fmt::Display for FileTreeLoadingError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        return write!(f, "There was an error instantiating a FileTree: {}", self.0);
    }
}

impl Error for FileTreeLoadingError {}

/// # Errors
///
/// Will return `Err` if it fails to parse the curl request.
pub fn parse_curl(input: &str) -> Result<StringRequest, Box<dyn Error>> {
    let parsed = match ParsedRequest::load(input, Some(())) {
        Ok(parsed) => parsed,
        Err(e) => return Err(Box::new(e)),
    };
    let body = parsed.body[0].clone();
    let headers = match get_headers(&parsed) {
        Ok(headers) => headers,
        Err(e) => return Err(e),
    };
    let url = parsed.url.to_string();
    let method = parsed.method.to_string();
    return Ok(StringRequest {
        url,
        method,
        body,
        headers,
    });
}

/// # Errors
///
/// Will return `Err` if it fails to convert the header content to a HasMap<string, string>.
fn get_headers(parsed: &ParsedRequest) -> Result<HashMap<String, String>, Box<dyn Error>> {
    let mut headers: HashMap<String, String> = HashMap::new();
    let header_results = parsed.headers.iter().map(|header| {
        let header_name = header.0.to_string();
        let header_content_slice = header.1.to_str();
        let header_content = match header_content_slice {
            Ok(content) => String::from(content),
            Err(e) => return Err(Box::new(e)),
        };
        headers.insert(header_name, header_content);
        return Ok(());
    });
    for header_result in header_results {
        match header_result {
            Ok(_) => (),
            Err(e) => return Err(e),
        }
    }
    return Ok(headers);
}

impl FileTree {
    /// # Errors
    ///
    /// Will return `Err` if it fails to read the directory.
    /// Will return `Err` if it fails to read a directory entry.
    fn new(path: String) -> Result<Box<FileTree>, Box<dyn Error>> {
        let dir = match fs::read_dir(&path) {
            Ok(dir) => dir,
            Err(e) => return Err(Box::new(e)),
        };
        let mut dir_entries = vec![];
        for entry in dir {
            match entry {
                Ok(entry) => dir_entries.push(entry),
                Err(e) => return Err(Box::new(e)),
            };
        }
        let name_path = path.clone();
        let name = Path::new(&name_path).file_name().unwrap().to_string_lossy();

        let mut this_file_tree = Box::new(FileTree {
            folder_paths: vec![],
            files: vec![],
            current_path: path,
            current_name: name.into_owned(),
        });

        for entry in dir_entries {
            let path = entry.path();
            let entry_name = entry.file_name().to_string_lossy().into_owned();
            let path_string = path.to_string_lossy().into_owned();
            if path.is_dir() {
                match FileTree::new(path_string) {
                    Ok(file_tree) => this_file_tree.folder_paths.push(*file_tree),
                    Err(e) => return Err(e),
                };
            } else {
                this_file_tree.files.push(File {
                    name: entry_name,
                    path: path_string,
                });
            }
        }
        return Ok(this_file_tree);
    }
}

impl StringRequest {
    /// # Errors
    ///
    /// Will return `Err` if it fails to serialize the request to JSON.
    pub fn to_beautified_json(&self) -> Result<String, Box<dyn Error>> {
        let json = match serde_json::to_string_pretty(&self) {
            Ok(json) => json,
            Err(e) => return Err(Box::new(e)),
        };
        return Ok(json);
    }
}

impl JSONWorksPaceFileStore {
    pub fn new() -> Self {
        return Self {
            file_refs: HashMap::new(),
            file_tree: None,
        };
    }
    /// # Errors
    ///
    /// Will return `Err` if it fails to load the file contents.
    /// Will return `Err` if it fails to load the file contents into the file store.
    pub fn load_file(&mut self, path: String) -> Result<Option<&String>, Box<dyn Error>> {
        let file_refs = &mut self.file_refs;
        let read_path = path.clone();
        if *(&file_refs.get(&path).unwrap_or(&None).is_none()) {
            let file_content = match fs::read_to_string(&path) {
                Ok(string_content) => Box::new(string_content),
                Err(e) => return Err(Box::new(e)),
            };
            file_refs.insert(path, Some(*file_content));
        }

        match file_refs.get(&read_path) {
            Some(content) => {
                return Ok(content.as_ref());
            }
            None => {
                return Err(Box::new(std::io::Error::new(
                    std::io::ErrorKind::NotFound,
                    "Failed to load file contents",
                )))
            }
        };
    }
    fn alloc_file_refs(&mut self, file_tree: &FileTree) {
        for file in &file_tree.files {
            self.file_refs.insert(file.path.clone(), None);
        }
        for folder in &file_tree.folder_paths {
            self.alloc_file_refs(folder);
        }
    }
    /// # Errors
    ///
    /// Will return `Err` if the file tree was not loaded before
    /// and it fails to instantiate it.
    pub fn get_file_tree(&mut self, path: String) -> Result<&FileTree, Box<dyn Error>> {
        match self.file_tree {
            Some(_) => (),
            None => {
                let new_file_tree = match FileTree::new(path) {
                    Ok(file_tree) => Some(file_tree),
                    Err(e) => return Err(e),
                };
                let new_file_tree_ref = match new_file_tree.as_ref() {
                    Some(file_tree) => file_tree,
                    None => {
                        return Err(Box::new(FileTreeLoadingError(
                            "Tried to reference a file tree that was not loaded",
                        )))
                    }
                };
                self.alloc_file_refs(new_file_tree_ref);
                self.file_tree = new_file_tree;
            }
        };
        match &self.file_tree {
            Some(file_tree) => {
                return Ok(file_tree);
            }
            None => return Err(Box::new(FileTreeLoadingError("Loaded empty file tree"))),
        }
    }
}

impl JSONWorksPace {
    pub fn new(location: Option<&str>) -> Self {
        let location = String::from(location.unwrap_or(".\\workspace"));
        return Self {
            location,
            file_store: JSONWorksPaceFileStore::new(),
        };
    }
    /// # Errors
    ///
    /// Will return `Err` if `JSONWokrsPace.location` does not exist or the user does not have
    /// permission to read it.
    pub fn load_file_tree(&mut self) -> Result<&FileTree, Box<dyn Error>> {
        return match self.file_store.get_file_tree(self.location.clone()) {
            Ok(file_tree) => Ok(file_tree),
            Err(e) => Err(e),
        };
    }
    pub fn get_location(&self) -> &String {
        return &(self.location);
    }
    /// # Errors
    ///
    /// Will return `Err` if `filename` does not exist or the user does not have
    /// permission to read it.
    pub fn load_file(&mut self, path: String) -> Result<String, Box<dyn Error>> {
        match self.file_store.load_file(path) {
            Ok(content) => match content {
                Some(content) => return Ok(content.to_string()),
                None => {
                    return Err(Box::new(std::io::Error::new(
                        std::io::ErrorKind::NotFound,
                        "Failed to load contents of file",
                    )))
                }
            },
            Err(e) => return Err(e),
        }
    }
}
