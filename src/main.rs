mod db_driver;
mod models;
mod schema;

use db_driver::{fetch_records, insert_record};
use rocket::response::content::{RawHtml, RawJavaScript};
use rocket::response::Responder;
use rocket::serde::json::serde_json::json;
use rocket::serde::json::{Value as JsonValue, Json};
use serde::Deserialize;

#[macro_use]
extern crate rocket;

static INDEX_HTML: &str = include_str!("./frontend/build/index.html");
static MAIN_JS: &str = include_str!("./frontend/build/main.js");
static FAVICON_ICO: &[u8] = include_bytes!("./frontend/build/favicon.ico");

#[allow(non_snake_case)]
#[derive(Debug, PartialEq, Eq, Deserialize)]
pub struct PaperInput {
    pub employeeId: String,
    pub employeeName: String,
    pub email: String,
    pub paperTitle: String,
    pub journal: String,
    pub publicationYear: i32,
}

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
            record.employee_id,
            record.employee_name,
            record.email,
            record.paper_title,
            record.journal,
            record.publication_year
        ]));
    }

    records_json
}

#[post("/newpaper", format = "json", data = "<paper_input>")]
fn newpaper_handler(paper_input: Json<PaperInput>) -> JsonValue {

    insert_record(
        &paper_input.employeeId,
        &paper_input.employeeName,
        &paper_input.email,
        &paper_input.paperTitle,
        &paper_input.journal,
        paper_input.publicationYear
    );

    json!({
        "success": true,
        "message": "New record successfully inserted!"
    })

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
            records_handler,
            newpaper_handler
        ],
    )
}
