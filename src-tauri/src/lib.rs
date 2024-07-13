#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use json_workspace::JSONWorksPace;
use reqwest::header::{HeaderMap, HeaderName, HeaderValue};
use serde::Serialize;
use serde_json::json;
use std::collections::HashMap;
use std::env;
use std::error::Error;
use std::str::FromStr;
use std::sync::{Arc, Mutex};
use tauri::State;

fn get_current_dir_string_lossy(path_str: &str) -> Result<String, String> {
    match env::current_dir() {
        Ok(path) => Ok(path.join(path_str).to_string_lossy().to_string()),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
fn get_environment_file_tree(state: State<Arc<Mutex<JSONWorksPace>>>) -> Result<String, String> {
    let mut jwp_lock = state.lock().unwrap();
    let file_tree = (*jwp_lock).load_file_tree();
    match file_tree {
        Ok(file_tree) => return Ok(json!(file_tree).to_string()),

        Err(e) => return Err(e.to_string()),
    }
}

#[tauri::command]
fn get_file_contents(
    state: State<Arc<Mutex<JSONWorksPace>>>,
    path: String,
) -> Result<String, String> {
    let mut jwp_lock = state.lock().unwrap();
    let file_contents = (*jwp_lock).load_file(path);
    match file_contents {
        Ok(file_contents) => return Ok(file_contents),
        Err(e) => return Err(e.to_string()),
    }
}

#[derive(Serialize)]
struct ResponseType {
    status: u16,
    headers: HashMap<String, Vec<String>>,
    body: String,
    url: String,
}

#[derive(Serialize)]
struct  ErrorType {
    name: String,
    message: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    status: Option<u16>,
    #[serde(skip_serializing_if = "Option::is_none")]
    url: Option<String>,
}

fn convert_map(headers: &HeaderMap<HeaderValue>) -> HashMap<String, Vec<String>> {
    let mut header_hashmap = HashMap::new();
    for (k, v) in headers {
        let k = k.as_str().to_owned();
        let v = String::from_utf8_lossy(v.as_bytes()).into_owned();
        header_hashmap.entry(k).or_insert_with(Vec::new).push(v)
    }
    header_hashmap
}

#[tauri::command]
async fn send_request(
    url: String,
    method: String,
    headers: Option<HashMap<String, Vec<String>>>,
    body: Option<String>,
) -> Result<ResponseType, ErrorType> {
    let header_map = match headers {
        Some(headers) => {
            let mut header_map = HeaderMap::new();
            for (key, values) in headers.into_iter() {
                for value in values {
                    header_map.append(
                        HeaderName::from_str(key.as_str()).unwrap(),
                        value.parse().unwrap(),
                    );
                }
            }
            header_map
        }
        None => HeaderMap::new(),
    };

    let client = reqwest::Client::new();
    let client = match method.as_str() {
        "GET" => client.get(url),
        "POST" => client.post(url),
        "PUT" => client.put(url),
        "PATCH" => client.patch(url),
        "DELETE" => client.delete(url),
        method => return Err(ErrorType {
            name: "InvalidMethod".to_string(),
            message: format!("Invalid method: {}", method),
            status: None,
            url: None,
        }),
    };
    let client = match body {
        Some(body) => client.body(body),
        None => client,
    };

    let response = client.headers(header_map).send().await;
    let response = match response {
        Ok(response) => response,
        Err(e) if (e.is_timeout()) =>{
            return  Err(ErrorType{
                name: "Timeout".to_string(),
                message: "Request timed out".to_string(),
                status: None,
                url: None,
            });
        }
        Err(e) => {
            let err = e.source().unwrap().to_string();
            return Err(ErrorType{
                name: e.to_string(),
                message: err,
                status: e.status().and_then(|s| Some(s.as_u16())),
                url: e.url().and_then(|u| Some(u.to_string())),
            });
        },
    };

    let status = response.status().as_u16();
    let headers = convert_map(response.headers());
    let url = response.url().to_string();
    let body = response.text().await.unwrap();

    Ok(ResponseType {
        status,
        headers,
        url,
        body,
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let path = get_current_dir_string_lossy("default-workspace").unwrap();
    let jwp = JSONWorksPace::new(Some(&path));
    let jwp_mutex = Arc::new(Mutex::new(jwp));
    tauri::Builder::default()
        .manage(jwp_mutex)
        .invoke_handler(tauri::generate_handler![
            get_environment_file_tree,
            get_file_contents,
            send_request,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
