(module
  (func $calc (param $lhs i32) (param $rhs i32) (result i32)
      local.get $lhs
      local.get $rhs
      i32.mul)
  (export "calc" (func $calc))
)
