SELECT format_type(atttypid, atttypmod) AS embedding_type
FROM pg_attribute
WHERE attrelid = '"MenuItem"'::regclass AND attname = 'embedding';
