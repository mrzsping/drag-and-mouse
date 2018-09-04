,
    dragMethod(from, to, itemClass, _$) {
      let cloneObj = null;
      const holdItemDom = document.createElement('li');
      holdItemDom.classList.add(itemClass, 'hold');
      // 拖拽
      _$(from).ondragstart = (event) => {
        cloneObj = event.target.cloneNode(true);
      };
      _$(to).ondragover = (event) => {
        event.preventDefault();
      // 第一子元素为text去掉
        if (_$(to).childNodes.length && _$(to).childNodes[0].nodeType === 3) {
          _$(to).childNodes[0].remove();
        }
        _$(to).appendChild(holdItemDom);
      };
      // 拖拽未放置
      _$(to).ondragleave = (event) => {
        if (event.fromElement && event.fromElement.className.indexOf('hold') === -1) {
          holdItemDom.remove();
          window.console.log(11111111111);
        }
      };
      // 放置
      _$(to).ondrop = (event) => {
        event.preventDefault();
        holdItemDom.remove();
        event.currentTarget.appendChild(cloneObj);
        // 设置id
        Array.from(event.currentTarget.children).forEach((v, i) => {
          v.draggable = false;
          (() => {
            v.id = i + 2;
            v.style = `margin: ${window.getComputedStyle(v).margin} `;
          })(i);
        });
      };
    },
    move(c, itemClass, delClass, active, _$, __$) {
    // 定义元素获取
      const holdItemDom = document.createElement('li');
      const listDom = _$(c);
      let dragObj;
      holdItemDom.classList.add(itemClass, 'hold');
    // 移动显示
    // mousedown
      listDom.onmousedown = (event) => {
        if (listDom.firstChild && listDom.firstChild.nodeType === 3) {
          listDom.removeChild(listDom.firstChild);
        }
        let currenIndex;
        const itemDomList = __$(`${c} .${itemClass}`);
        const listLength = listDom.children.length;
        const startY = event.clientY;
        const startX = event.clientX;
        const delBtn = __$(delClass);
        const currentItems = __$(`${c} .${itemClass}`);
        let selectIndex;
        // 删除
        Array.from(delBtn).forEach((v, i) => {
          v.onclick = () => {
            listDom.children[i].remove();
          };
        });
        if (event.target.className === 'del') {
          return;
        }
        // 获取index
        if (event.target.className === itemClass) {
          dragObj = event.target;
        } else if (event.target.offsetParent.parentNode.className === itemClass) {
          dragObj = event.target.offsetParent.parentNode;
        } else {
          return;
        }
        Array.from(itemDomList).forEach((v, i) => {
          if (v === event.target || v === event.target.offsetParent.parentNode) {
            selectIndex = i;
          }
        });
        // 获取width及鼠标位置
        const ml = parseInt(dragObj.style.marginLeft, 10);
        const n = Math.floor(listDom.clientWidth / (dragObj.clientWidth + 2 * ml));
        const itemHeight = dragObj.clientHeight;
        const itemWidth = dragObj.clientWidth;
        const topIndex = selectIndex;
        // 添加显示框
        dragObj.after(holdItemDom);
        dragObj.classList.add(active);
        dragObj.style.top = `${(dragObj.clientHeight + 2 * ml) * Math.floor(selectIndex / n)}px`;
        dragObj.style.left = `${(dragObj.clientWidth + 2 * ml) * (selectIndex % n)}px`;
        const startTop = dragObj.style.top;
        const startLeft = dragObj.style.left;
        // 移动
        document.onmousemove = (e) => {
          dragObj.classList.add(active);
          const moveY = e.clientY;
          const moveX = e.clientX;
          const presentTop = parseInt(startTop, 10) + (moveY - startY);
          const presentLeft = parseInt(startLeft, 10) + (moveX - startX);
          const currentIndexX = Math.ceil((parseInt(presentLeft, 10) - itemWidth / 2 - ml)
           / (itemWidth + ml));
          const currentIndexY = n * Math.ceil((parseInt(presentTop, 10) - itemHeight / 2 - ml)
           / (itemHeight + ml));
          dragObj.style.top = `${presentTop}px`;
          dragObj.style.left = `${presentLeft}px`;
          // 移动之后的index
          currenIndex = currentIndexX + currentIndexY;
          if (currenIndex < 0) currenIndex = 0;
          if (currenIndex > listLength - 1) currenIndex = listLength - 1;
          if (topIndex !== currenIndex) {
            holdItemDom.remove();
            if (currenIndex < topIndex) {
              dragObj.remove();
              itemDomList[currenIndex].before(dragObj);
              dragObj.after(holdItemDom);
            } else {
              currentItems[currenIndex].after(holdItemDom);
            }
          }
        };
          // 放置
        document.onmouseup = () => {
          if (currenIndex > topIndex) {
            currentItems[currenIndex].after(dragObj);
          }
          holdItemDom.remove();
          dragObj.classList.remove(active);
          dragObj.classList.remove('select');
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    },
    moveToAdd() {
      const fOne = selectors => document.querySelector(selectors);
      const fAll = selectors => document.querySelectorAll(selectors);
      this.move('.template-page .page', 'item', '.del', 'select', fOne, fAll);
      this.dragMethod('.template-page .module', '.template-page .page', 'item', fOne);
    },