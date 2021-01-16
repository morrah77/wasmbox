(module
  (func $add (param $lhs i32) (param $rhs i32) (result i32)
      local.get $lhs
      local.get $rhs
      i32.add)
  (export "add" (func $add))
  (func $sub (param $lhs i32) (param $rhs i32) (result i32)
      local.get $lhs
      local.get $rhs
      i32.sub)
  (export "sub" (func $sub))
  (func $mul (param $lhs i32) (param $rhs i32) (result i32)
      local.get $lhs
      local.get $rhs
      i32.mul)
  (export "mul" (func $mul))
  (func $div (param $lhs i32) (param $rhs i32) (result i32)
      local.get $lhs
      local.get $rhs
      i32.div_u)
  (export "div" (func $div))
)
