// ارسال داده‌ها به سرور
document.getElementById('data-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  const response = await fetch('/submit-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, message })
  });

  const data = await response.json();
  if (data.message === 'Data saved successfully') {
    alert('داده با موفقیت ذخیره شد');
    loadData(); // نمایش داده‌ها پس از ذخیره شدن
  } else {
    alert('خطا در ذخیره داده‌ها');
  }
});

// دریافت داده‌ها از دیتابیس و نمایش آن‌ها
async function loadData() {
  const response = await fetch('/get-data');
  const data = await response.json();

  const dataList = document.getElementById('data-list');
  dataList.innerHTML = ''; // پاک کردن داده‌های قبلی

  data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name}: ${item.message}`;
    dataList.appendChild(li);
  });
}

// بارگذاری داده‌ها در ابتدای صفحه
loadData();
