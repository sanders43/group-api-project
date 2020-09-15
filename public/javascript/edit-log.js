 async function editFormHandler(event) {

    console.log('button clicked');

    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    console.log('button clicked');
    console.log(id);

    //TODO: event listener/button click is working... now what to do with the edit...?
    //redirect to the original add-log page but with current info populated?

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const post_text = document.querySelector('textarea[name="post-text"]').value.trim();

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }

  

}

document.querySelector('#edit-log-btn').addEventListener('click', editFormHandler);