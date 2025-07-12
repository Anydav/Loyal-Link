const { createClient } = supabase;
const supabase = createClient('https://upcreedrhrazbrbxgkyh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwY3JlZWRyaHJhemJyYnhna3loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMjEyNDAsImV4cCI6MjA2Nzg5NzI0MH0.PXxOutW_ex3uz_k69sCciEQsqP7AV9nUMl-ROR_AffM');


// No transition effects — just direct navigation
document.addEventListener("DOMContentLoaded", function () {
  // Optional: If you still want to handle links manually
  document.querySelectorAll("a.transition-link").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = this.getAttribute("href");
    });
  });
});
