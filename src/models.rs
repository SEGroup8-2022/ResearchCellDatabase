use super::schema::*;
use diesel::prelude::*;

#[derive(Queryable)]
pub struct Record {
    pub id: i32,
    pub employee_id: String,
    pub employee_name: String,
    pub email: String,
    pub paper_title: String,
    pub journal: String,
    pub publication_year: i32,
}

#[derive(Insertable)]
#[diesel(table_name = papers)]
pub struct NewRecord<'a> {
    pub employee_id: &'a str,
    pub employee_name: &'a str,
    pub email: &'a str,
    pub paper_title: &'a str,
    pub journal: &'a str,
    pub publication_year: i32,
}
