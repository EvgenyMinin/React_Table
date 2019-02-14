import React from 'react';

const DetailRowView = ({ post }) => {
    return (
        <div>
            <p>Выбран пользователь № <b>{post.id}</b>. </p>
            <p>Имя пользователя <b>{post.firstName} {post.lastName}</b>. </p>
            <p>Адрес проживания <b>{post.address.city}, {post.address.state} {post.address.streetAddress}</b>. </p>
            <p>Описание: <b>{post.description}</b>. </p>
        </div>
    );
}
 
export default DetailRowView;