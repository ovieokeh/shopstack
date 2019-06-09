CREATE PROCEDURE catalog_get_department_name(IN inDepartmentId INT)
BEGIN
  SELECT name FROM department WHERE department_id = inDepartmentId;
END

-- Create catalog_get_category_name stored procedure


-- Create catalog_get_product_name stored procedure
