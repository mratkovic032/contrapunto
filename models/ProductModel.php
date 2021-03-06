<?php
    namespace App\Models;   
    use App\Core\Model;
    use App\Core\Field;    
    use App\Validators\NumberValidator;
    use App\Validators\DateTimeValidator;
    use App\Validators\StringValidator;

    class ProductModel extends Model {

        protected function getFields(): array {
            return [
                'product_id'        => new Field((new NumberValidator())->setIntegerLength(10), false),
                'created_at'      => new Field((new DateTimeValidator())->allowDate()->allowTime(), false),

                'name'              => new Field((new StringValidator())->setMaxLength(128)),
                'description'       => new Field((new StringValidator())->setMaxLength(64*1024)),
                'price'             => new Field((new NumberValidator())->setDecimal()->setUnsigned()->setIntegerLength(7)->setMaxDecimalDigits(2)),
                'img_path'          => new Field((new StringValidator())->setMaxLength(255)),
                'category_id'       => new Field((new NumberValidator())->setIntegerLength(10)),
                'sub_category'      => new Field((new StringValidator())->setMaxLength(128))
            ];
        }                

        public function getAllByKeyword(string $keywords): array {
            $sql = 'SELECT product.*, category.name AS "category_name" FROM product INNER JOIN category ON product.category_id = category.category_id WHERE 
                    product.name LIKE ? OR product.description LIKE ?;';

            $keywords = '%' . $keywords . '%';

            $prep = $this->getConnection()->prepare($sql);
            if (!$prep) {
                return [];
            }
            $res = $prep->execute([ $keywords, $keywords ]);
            if (!$res) {
                return [];
            }

            return $prep->fetchAll(\PDO::FETCH_OBJ);
        }
        
        public function getAllProductsByCategoryId(int $category_id): array {
            $sql = 'SELECT product.*, category.name AS "category", category.description AS "category_description", category.is_active FROM product INNER JOIN category ON product.category_id = category.category_id 
                    WHERE product.category_id = ?;';
            $prep = $this->getConnection()->prepare($sql);
            $res = $prep->execute([ $category_id ]);
            $products = [];
            if ($res) {
                $products = $prep->fetchAll(\PDO::FETCH_OBJ);
            }            
            return $products;
        }  

        public function showWholeProduct(int $productId) {
            $sql = 'SELECT product.*, brand.name AS "brand", category.name AS "category", product_version.quantity, size.value AS "size", size.size_id, color.name AS "color", color.color_id, admin.username AS "admin" FROM 
                    (((product INNER JOIN brand ON product.brand_id = brand.brand_id) INNER JOIN category ON product.category_id = category.category_id) INNER JOIN admin ON product.admin_id = admin.admin_id) INNER JOIN 
                    ((product_version INNER JOIN color ON product_version.color_id = color.color_id) INNER JOIN size ON product_version.size_id = size.size_id) ON product.product_id = product_version.product_id
                    WHERE product.product_id = ?;';
            $prep = $this->getConnection()->prepare($sql);            
            $res = $prep->execute([ $productId ]);            
            $wholeProduct = NULL;
            if ($res) {
                $wholeProduct = $prep->fetch(\PDO::FETCH_OBJ);
            }
            return $wholeProduct;
        }
    }