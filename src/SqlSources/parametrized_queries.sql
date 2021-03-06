create table master.parametrized_queries
(
    id int primary key auto_increment,
    parsed_query mediumtext not null check ( parsed_query <> '' ),
    parsed_query_hash char(40) not null unique,
    constraint UC_parametrized_query unique (parsed_query_hash)
);