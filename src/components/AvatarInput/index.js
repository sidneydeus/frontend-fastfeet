import React, { Component, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import Avatar from 'react-avatar';
import api from '~/services/api';

import { Container } from './styles';

export default function AvatarInput(props) {
  const { deliverymanAvatar } = props;
  const { deliverymanName } = props;

  const { defaultValue, registerField } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('avatars', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);

    registerField({
      name: 'avatar_id',
      ref: ref.current,
      path: 'dataset.file',
      value: id
    });
  }

  Component.PropTypes = {
    deliverymanName: PropTypes.string,
    deliverymanAvatar: PropTypes.string
  };

  return (
    <Container>
      <label htmlFor="avatar">
        <Avatar
          src={preview || deliverymanAvatar}
          round="50px"
          textSizeRatio={2}
          size="100"
          title={deliverymanName}
          alt={deliverymanName}
          maxInitials={2}
          color="#F4EFFC"
          fgColor={Avatar.getRandomColor(deliverymanName, [
            '#A28FD0',
            '#CB946C',
            '#83CEC9',
            '#CC7584',
            '#A8D080',
            '#CCCC8B'
          ])}
          name={deliverymanName}
        />
        <input
          type="file"
          name=""
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
