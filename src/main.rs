use rocket::response::content::{RawHtml, RawJavaScript, RawJson};
use rocket::response::Responder;

use rocket::serde::json;

#[macro_use] extern crate rocket;

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
fn records_handler() -> RawJson<&'static str> {

    RawJson("[[1235,\"Kunal\",\"kunal@example.com\",\"C++ Application\",\"Tannennbaum\",2020],[1230,\"ARC\",\"arc@example.com\",\"Low Level Audio Processing\",\"Acoustics\",2021]]")

}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![
        root_handler,
        index_handler,
        script_handler,
        favicon_handler,
        records_handler
    ])
}

