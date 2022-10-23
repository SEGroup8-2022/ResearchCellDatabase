use std::path::{Path, PathBuf};
use rocket::fs::NamedFile;

#[macro_use] extern crate rocket;

#[get("/<file..>")]
async fn files(file: PathBuf) -> Option<NamedFile> {
    NamedFile::open(
        Path::new("./frontend/build/").join(file)
    ).await.ok()
}

#[get("/")]
async fn index() -> Option<NamedFile> {
    NamedFile::open(
        Path::new("./frontend/build/index.html")
    ).await.ok()
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![index, files])
}

