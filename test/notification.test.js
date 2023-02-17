import {describe,expect,test} from "vitest"
import {mount} from "@vue/test-utils";
import CMPNotification from "./src/components/Notification.vue";
// console.log("======",CMPNotification);

describe("test notification",()=>{
  // http://10.249.160.216:9100/siod-mdm-api/mdm/characterMaster/list
  
  test("test notifaction error",()=>{
    const type="error";
    const wrapper = mount(CMPNotification,{
      props:{type}
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["notification--error"])
    )
  });

  test("test notifaction success",()=>{
    const type="success";
    const wrapper = mount(CMPNotification,{
      props:{type}
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["notification--success"])
    )
  });

  test("slides up when message s empty",()=>{
    const message= "";

    const wrapper = mount(CMPNotification,{
      props:{ message }
    });
    expect(wrapper.classes("notification--slide")).toBe(false)
  })

  test("emits event when close button is clicked",async()=>{
    const wrapper = mount(CMPNotification,{
      data(){
        return {
          clicked:false,
        }
      }
    });

    const closeButton = wrapper.find("button");
    await closeButton.trigger("click");
    const emited = wrapper.emitted();
    // console.log(emited)
    expect(emited).toHaveProperty("clear-notification");
  })

  test("renders message when message is not empty",()=>{
    const message="Say something";

    const wrapper = mount(CMPNotification,{
      props:{message}
    });

    expect(wrapper.find("p.notification__text").text()).toBe(message);
  })
})