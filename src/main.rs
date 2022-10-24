mod db_driver;
mod models;
mod schema;

use db_driver::fetch_records;
use rocket::response::content::{RawHtml, RawJavaScript};
use rocket::response::Responder;
use rocket::serde::json::serde_json::json;
use rocket::serde::json::Value as JsonValue;

#[macro_use]
extern crate rocket;

static INDEX_HTML: &str = include_str!("./frontend/build/index.html");
static MAIN_JS: &str = include_str!("./frontend/build/main.js");
static FAVICON_ICO: &[u8] = include_bytes!("./frontend/build/favicon.ico");

#[derive(Responder)]
#[response(status = 200, content_type = "image/x-icon")]
struct Favicon(&'static [u8]);

#[get("/")]
fn root_handler() -> RawHtml<&'static str> {
    RawHtml(INDEX_HTML)
}

#[get("/index.html")]
fn index_handler() -> RawHtml<&'static str> {
    RawHtml(INDEX_HTML)
}

#[get("/main.js")]
fn script_handler() -> RawJavaScript<&'static str> {
    RawJavaScript(MAIN_JS)
}

#[get("/favicon.ico")]
fn favicon_handler() -> Favicon {
    Favicon(FAVICON_ICO)
}

#[get("/records")]
fn records_handler() -> JsonValue {
    let mut records_json = json!([]);

    for record in fetch_records() {
        records_json.as_array_mut().unwrap().push(json!([
            record.employeeId,
            record.employeeName,
            record.email,
            record.paperTitle,
            record.journal,
            record.publicationYear
        ]));
    }

    records_json
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount(
        "/",
        routes![
            root_handler,
            index_handler,
            script_handler,
            favicon_handler,
            records_handler
        ],
    )
}
