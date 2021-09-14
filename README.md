# Canvas 그림판

### 마우스, 터치 이벤트 반응
[예제사이트](http://seonn.dothome.co.kr/canvas-paint/)

#### 리사이징 후 다시 그려주기 
- [참고사이트](https://ohgyun.com/320)
- [drawImage()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)

````javascript
// 이미지 base64 로 인코딩 된 데이터 저장하기
let imageData = canvas.toDataURL();
// 복사할 캔버스의 컨텍스트를 가져와 drawImage를 호출해 다시 그려줌
ctx.drawImage(image, 0, 0);
// 이미지 객체를 만든 후 이미지 문자열을 src에 할당
image.src = imageData;
````

### 쓰기 & 지우기
- [도형합성](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)
- [한글설명](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=javaking75&logNo=140170321918)

````javascript
// 쓰기: 기본설정, 처음 그려진 도형 위로 나중에 그려진 도형이 표시됨
ctx.globalCompositeOperation = 'source-over';
// 지우기: 처음 그려진 도형에서 겹치지 않는 부분만 표시됨
ctx.globalCompositeOperation = 'destination-out';
````