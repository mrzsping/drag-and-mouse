## 这是拖拽模板
相关的学习链接：

 1.[mdn](https://developer.mozilla.org/zh-CN/docs/Web/Events/drag)
 
 2.[mouse](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent)
 
 3.[一个拖拽生成表格网站](http://formbuild.leipi.org/)

 4.总结：

  (1).使用document.getElementsByClassName()查找元素，绑定onmousedown时，考虑子元素触发情况

  (2).vue使用v-html插入元素，再使用document.querySelector查找元素。可能出现查找元素为空 ,使用html插入元素，再使用document.getElementsByClassName查找元素出现查找到但是不能取得长度的情况，因为dom未更新，使用updated解决
 
