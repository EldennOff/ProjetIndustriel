<?php

namespace App\Serializer;

use ReflectionClass;

class ObjectSerializer
{
    public function toJson(object $entity, bool $stringify = true)
    {
        $data = [];

        $reflectionClass = new ReflectionClass($entity);
        $properties = $reflectionClass->getProperties();

        foreach ($properties as $property) {
            $parts = explode('_', $property->getName());
            $parts = array_map('ucfirst', $parts);
            $propertyName = implode('', $parts);

            $getterName = 'get' . $propertyName;

            if (method_exists($entity, $getterName)) {
                $value = $entity->$getterName();
            } else {
                $property->setAccessible(true);
                $value = $property->getValue();
            }

            $data[$property->getName()] = $value;
        }

        return $stringify ? json_encode($data, JSON_PRETTY_PRINT) : $data;
    }
}
