#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use json_workspace::JSONWorksPace;
use serde_json::json;
use std::env;
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

fn main() {
    let path = get_current_dir_string_lossy("default-workspace").unwrap();
    let jwp = JSONWorksPace::new(Some(&path));
    let jwp_mutex = Arc::new(Mutex::new(jwp));
    tauri::Builder::default()
        .manage(jwp_mutex)
        .invoke_handler(tauri::generate_handler![
            get_environment_file_tree,
            get_file_contents
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
