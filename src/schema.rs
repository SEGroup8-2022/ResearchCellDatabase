// @generated automatically by Diesel CLI.

diesel::table! {
    papers (_id) {
        _id -> Integer,
        employee_id -> Text,
        employee_name -> Text,
        email -> Text,
        paper_title -> Text,
        journal -> Text,
        publication_year -> Integer,
    }
}
