<?php
    namespace App\Models;
    use App\Core\Model;
    use App\Core\Field;
    use App\Validators\NumberValidator;
    use App\Validators\DateTimeValidator;
    use App\Validators\StringValidator;
    use App\Validators\BitValidator;

    class CategoryModel extends Model {

        protected function getFields(): array {
            return [
                'category_id'   => new Field((new NumberValidator())->setIntegerLength(10), false),

                'name'          => new Field((new StringValidator())->setMaxLength(64)),
                'description'   => new Field((new StringValidator())->setMaxLength(64*1024)),
                'tag'          => new Field((new StringValidator())->setMaxLength(64)),
                'img_path'      => new Field((new StringValidator())->setMaxLength(255)),
                'is_active'       => new Field(new BitValidator())
            ];
        }                
    }