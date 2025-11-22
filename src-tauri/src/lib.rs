// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

#[tauri::command]
//dummy function to fetch server health
fn fetch_server_health() -> String {
    // counter
    format!("Dummy Health")
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![fetch_server_health])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
