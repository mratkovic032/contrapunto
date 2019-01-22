<?php
    namespace App\Controllers;

    use App\Models\ProductModel;
    use App\Models\CategoryModel;    
    use App\Core\Controller;

    class CategoryController extends Controller {
        
        public function show(int $category_id) {
            $categoryModel = new CategoryModel($this->getDatabaseConnection());

            $categoryModel->updateByFieldName('is_active', 0, 1);

            $categoryModel->editById($category_id, [
                'is_active' => 1
            ]);

            $productModel = new ProductModel($this->getDatabaseConnection());
            $products = $productModel->getAllProductsByCategoryId($category_id);
            $this->set('products', $products);

            $categories = $categoryModel->getAll();            
            $this->set('categories', $categories);
        }                    
    }
