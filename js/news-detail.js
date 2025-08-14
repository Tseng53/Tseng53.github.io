// 取得網址參數
function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

document.addEventListener('DOMContentLoaded', function() {
  // 取得網址參數
  function getQueryParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
  }

  const id = getQueryParam('id');
  let item = null;

  if (window.newsData && window.newsData.news) {
    item = window.newsData.news.find(n => n.id === id);
  }
  if (!item && window.eventsData && window.eventsData.events) {
    item = window.eventsData.events.find(e => e.id === id);
  }

  if (!window.newsData || !window.newsData.news) {
    document.getElementById('news-title').textContent = "資料未載入（newsData/newsData.news 不存在）";
    document.getElementById('news-date').textContent = "";
    document.getElementById('news-content').textContent = "請確認 activities.js 是否正確載入於本頁。";
    return;
  }

  if (item) {
    document.getElementById('news-title').textContent = item.title;
    document.getElementById('news-date').textContent = new Date(item.date).toLocaleDateString();
    document.getElementById('news-content').innerHTML = `
      ${item.image ? `<img src="${item.image}" alt="${item.title}" style="max-width:100%;margin-bottom:1rem;border-radius:8px;">` : ''}
      <p>${(item.description || item.content || '').replace(/\n/g, '<br>')}</p>
    `;
  } else {
    document.getElementById('news-title').textContent = "找不到這則消息";
    document.getElementById('news-date').textContent = "";
    document.getElementById('news-content').textContent = "";
  }
});
