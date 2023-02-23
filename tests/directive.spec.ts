import { Component, reactive, ref } from 'vue'
import { vi, beforeEach, test, expect } from "vitest"
import * as vueTestUtils from '@vue/test-utils';
import { directive } from '../src/directive';
import { scroll } from '../src/scroll';

vi.mock('../src/scroll');
beforeEach(() => { vi.clearAllMocks(); });


test('it automatically calls scrolls on init', () => {
  const MyComponent: Component = {
    template: '<div v-chat-scroll />',
  };

  const localDirective = directive;
  const wrapper = vueTestUtils.mount(MyComponent, { 
    global: {
      directives: { 'chat-scroll': localDirective }
    }
   });
  expect(scroll).toHaveBeenCalledTimes(1);
  expect(scroll).toHaveBeenCalledWith(wrapper.element);
});

test('it calls scroll when an item is added', async () => {
  const data = reactive({ items: [] })
  const MyComponent: Component = {
    data: () => data,
    template: '<div v-chat-scroll><div v-for="item in items">{{ item }}</div></div>',
  };

  const localDirective = directive;
  localDirective.mounted = vi.fn();
  const wrapper = vueTestUtils.mount(MyComponent, { 
    global: {
      directives: { 'chat-scroll': localDirective }
    }
   });

  data.items.push('A new item')
  await wrapper.setData(data);
  expect(scroll).toHaveBeenCalledTimes(1);
  expect(scroll).toHaveBeenCalledWith(wrapper.element);
});

test('it calls scroll when an item is removed', async () => {
  const data = reactive({ items: [1, 2, 3] })
  const MyComponent: Component = {
    data: () => data,
    template: '<div v-chat-scroll><div v-for="item in items">{{ item }}</div></div>',
  };

  const localDirective = directive;
  localDirective.mounted = vi.fn();
  const wrapper = vueTestUtils.mount(MyComponent, { 
    global: {
      directives: { 'chat-scroll': localDirective }
    }
   });

  data.items.pop();
  await wrapper.setData(data);
  expect(scroll).toHaveBeenCalledTimes(1);
  expect(scroll).toHaveBeenCalledWith(wrapper.element);
});

test('it obeys the enabled configuration parameter', async () => {
  const data = reactive({ items: [1, 2, 3], enabled: false })
  const MyComponent: Component = {
    data: () => data,
    template: '<div v-chat-scroll="{ enabled }"><div v-for="item in items">{{ item }}</div></div>',
  };

  const localDirective = directive;
  const wrapper = vueTestUtils.mount(MyComponent, { 
    global: {
      directives: { 'chat-scroll': localDirective }
    }
   });
  
  data.items.pop();
  await wrapper.setData(data);   
  expect(scroll).not.toHaveBeenCalled();


  data.enabled = true;
  data.items.pop();
  await wrapper.setData(data);
  expect(scroll).toHaveBeenCalledTimes(1);
  expect(scroll).toHaveBeenCalledWith(wrapper.element);
});

test('it correctly works when prepending', async () => {
  const data = reactive({ items: [1, 2, 3],  handlePrepend: true })
  const MyComponent: Component = {
    data: () => data,
    template: '<div v-chat-scroll="{ handlePrepend }"><div v-for="item in items">{{ item }}</div></div>',
  };

  const localDirective = directive;
  const wrapper = vueTestUtils.mount(MyComponent, { 
    global: {
      directives: { 'chat-scroll': localDirective }
    }
   });

  // Set the current wrapper to be 50 pixels tall.
  vi.spyOn(wrapper.element, 'scrollHeight', 'get').mockImplementation(() => 50);
  // We've scrolled all the way to the bottom.
  vi.spyOn(wrapper.element, 'scrollTop', 'get').mockImplementation(() => 50);

  data.items.pop();
  await wrapper.setData(data);
  expect(scroll).toHaveBeenCalledWith(wrapper.element, false);

  // We've now scrolled all the way to the top.
  vi.spyOn(wrapper.element, 'scrollTop', 'get').mockImplementation(() => 0);
  // Now the current wrapper should be 75 pixels tall (25 pixel increase).
  vi.spyOn(wrapper.element, 'scrollHeight', 'get').mockImplementation(() => 75);

  data.items.unshift(0);
  await wrapper.setData(data);
  expect(scroll).toHaveBeenCalledWith(wrapper.element, 25);
});
