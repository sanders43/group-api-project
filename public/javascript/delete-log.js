async function deleteFormHandler(event) {

    event.preventDefault();

    // console.log('button clicked');

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    // console.log(post_id);

    const post_id_trim = post_id.split(':')[0];
    // console.log(post_id_trim);


    const response = await fetch(`/api/posts/${post_id_trim}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }

}

document.querySelector('#delete-log-btn').addEventListener('click', deleteFormHandler);