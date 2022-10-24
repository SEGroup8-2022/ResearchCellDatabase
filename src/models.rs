use super::schema::*;
use diesel::prelude::*;

#[derive(Queryable)]
pub struct Record {
    pub id: i32,
    pub employeeId: String,
    pub employeeName: String,
    pub email: String,
    pub paperTitle: String,
    pub journal: String,
    pub publicationYear: i32,
}

#[derive(Insertable)]
#[diesel(table_name = papers)]
pub struct NewRecord<'a> {
    pub employeeId: &'a str,
    pub employeeName: &'a str,
    pub email: &'a str,
    pub paperTitle: &'a str,
    pub journal: &'a str,
    pub publicationYear: i32,
}
