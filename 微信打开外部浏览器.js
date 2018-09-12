function isWeiXin(e){
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/micromessenger/i) && ua.match(/micromessenger/i).toString() === 'micromessenger') {//判断微信浏览器
      document.getElementById('browser').style.display = 'block';
      e.currentTarget.classList.add('tab');// 移动端点击出现阴影
  }else{
      if(e.currentTarget.id === 'android'){
          e.currentTarget.setAttribute('href', 'http://video.cpsdb.com/app/declarer/lastest.apk');
      } else if (e.currentTarget.id === 'ios') {
          e.currentTarget.setAttribute('href', 'https://itunes.apple.com/cn/app/%E7%94%B3%E6%8A%A5%E5%AE%98/id1434048481?mt=8');// 弹出层弹出依然下载
      }
  }
}

<a href="#" id="android" onclick="isWeiXin(event)"><img src="../images/az.png">Android&nbsp;下载</a>
// 页面闪现