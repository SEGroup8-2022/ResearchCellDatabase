mod db_driver;
mod models;
mod schema;

use db_driver::{fetch_records, insert_record};
use rocket::serde::json::serde_json::json;
use rocket::serde::json::{Value as JsonValue, Json};
use serde::Deserialize;
use std::path::{Path, PathBuf};
use rocket::fs::NamedFile;

#[macro_use]
extern crate rocket;

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

#[get("/")]
async fn index_handler() -> Option<NamedFile> {
    NamedFile::open(Path::new("./src/frontend/build/index.html")).await.ok()
}

#[get("/<file..>")]
async fn files_handler(file: PathBuf) -> Option<NamedFile> {
    NamedFile::open(Path::new("./src/frontend/build/").join(file)).await.ok()
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
            index_handler,
            files_handler,
            records_handler,
            newpaper_handler
        ],
    )
}
