async function submitForm(formId, url, redirectUrl) {
    const form = document.getElementById(formId);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                alert(await res.text());
                window.location.href = redirectUrl;
            } else {
                const err = await res.text();
                alert(err);
            }
        } catch (error) {
            console.error(error);
            alert('Lỗi kết nối server');
        }
    });
}
