import { describe, test,expect,assert} from "vitest";
import {genNumber} from "./src/utils/index";

describe("test utils",()=>{
  test("test genNumber",()=>{
    expect(genNumber(1,3)).toEqual([1,2,3]);
    // expect(genNumber(3,7)).toMatchInlineSnapshot();
  })
  
  test.skip("skipped sqrt test",()=>{
    assert.equal(Math.sqrt(4),3);
  })
})