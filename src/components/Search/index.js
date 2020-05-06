import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { Container } from './styles';

import api from '~/services/api';

export default function Search({ name, datamodel, dataset }) {
  const [searchTerm, setSearchTerm] = useState();

  async function searchItem(s = '') {
    if (s === '') {
      const response = await api.get(datamodel);
      dataset(response.data);
    }

    const response = await api.get(datamodel, {
      params: { q: s }
    });
    dataset(response.data);
  }

  function handleChange(event) {
    const v = event.target.value;

    if (v === '') {
      setSearchTerm('');
      searchItem('');
    }

    if (v !== '') {
      setSearchTerm(v);
      searchItem(searchTerm);
    }
  }

  return (
    <form>
      <Container>
        <MdSearch />
        <input
          type="text"
          placeholder={`Busca por ${name} ...`}
          onChange={handleChange}
        />
      </Container>
    </form>
  );
}
