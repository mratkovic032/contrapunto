<?php
    namespace App\Controllers;

    use App\Core\ApiController;
    use App\Models\ProductModel;

    class ApiSearchController extends ApiController {

        private function normalizeKeywords(string $keywords):string {
            $keywords = trim($keywords);
            $keywords = preg_replace('/ +/', ' ', $keywords);
            # ...
            return $keywords;
        }
        
        public function quickSearch(string $keyword) {
            $productModel = new ProductModel($this->getDatabaseConnection());            
            $products = $productModel->getAllByKeyword($this->normalizeKeywords($keyword));
            $this->set('products', $products);
        }
    }