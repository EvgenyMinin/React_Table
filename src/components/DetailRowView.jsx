import React from 'react';

const DetailRowView = ({ post }) => {
    return (
        <div>
            <p>Выбрана статья №{post.id}</p>
            <p><b>Название статьи:</b> <br/> {post.title}</p>
            <p><b>Текст статьи:</b> <br/> {post.body}</p>
        </div>
    );
}
 
export default DetailRowView;