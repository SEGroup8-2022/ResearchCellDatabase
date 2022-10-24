use diesel::insert_into;
use diesel::prelude::*;
use dotenvy::dotenv;
use std::env;

use crate::models::*;
use crate::schema;

fn establish_connection() -> SqliteConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set!");
    SqliteConnection::establish(&database_url)
        .expect("Error connecting to database!")
}

pub fn fetch_records() -> Vec<Record> {
    use self::schema::papers::dsl::*;

    let connection = &mut establish_connection();

    papers.load::<Record>(connection).unwrap()
}

pub fn insert_record(
    employee_id: &str,
    employee_name: &str,
    email: &str,
    paper_title: &str,
    journal: &str,
    publication_year: i32
) {

    use self::schema::papers::dsl::papers;

    let connection = &mut establish_connection();

    let new_record = NewRecord {
        employee_id,
        employee_name,
        email,
        paper_title,
        journal,
        publication_year
    };

    insert_into(papers)
        .values(&new_record)
        .execute(connection)
        .unwrap();

}
