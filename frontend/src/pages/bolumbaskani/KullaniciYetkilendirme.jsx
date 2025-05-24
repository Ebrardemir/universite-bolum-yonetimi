import React, { useState } from 'react';
import '../../css/bolumbaskani/kullaniciYetkilendirme.css';

const KullaniciYetkilendirme = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) return;
    setUsers([...users, newUser]);
    setNewUser({ name: '', email: '', role: '' });
  };

  const handleDelete = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleSave = () => {
    setEditIndex(null);
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...users];
    updated[index][field] = value;
    setUsers(updated);
  };

  return (
    <div className="kullanici-yonetimi-container">
      <h2>Kullanıcı Yetkilendirme</h2>

      <div className="form-row">
        <input
          type="text"
          placeholder="Ad Soyad"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="E-posta"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="">Rol Seçin</option>
          <option value="ogretim-uyesi">Öğretim Üyesi</option>
          <option value="bolum-sekreteri">Bölüm Sekreteri</option>
          <option value="bolum-baskani">Bölüm Başkanı</option>
        </select>
        <button className="ekle-button" onClick={handleAddUser}>Ekle</button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Ad Soyad</th>
            <th>E-posta</th>
            <th>Rol</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>
                {editIndex === i ? (
                  <input
                    value={u.name}
                    onChange={(e) => handleInputChange(i, 'name', e.target.value)}
                  />
                ) : (
                  u.name
                )}
              </td>
              <td>
                {editIndex === i ? (
                  <input
                    value={u.email}
                    onChange={(e) => handleInputChange(i, 'email', e.target.value)}
                  />
                ) : (
                  u.email
                )}
              </td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => handleInputChange(i, 'role', e.target.value)}
                  disabled={editIndex !== i}
                >
                  <option value="ogretim-uyesi">Öğretim Üyesi</option>
                  <option value="bolum-sekreteri">Bölüm Sekreteri</option>
                  <option value="bolum-baskani">Bölüm Başkanı</option>
                </select>
              </td>
              <td>
                <div className="action-buttons">
                  {editIndex === i ? (
                    <button className="kaydet" onClick={handleSave}>Kaydet</button>
                  ) : (
                    <button className="duzenle" onClick={() => handleEdit(i)}>Düzenle</button>
                  )}
                  <button className="sil" onClick={() => handleDelete(i)}>Sil</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="modul-yetki-info">
        <h3>Modül Yetkileri (Gelecek Özellik)</h3>
        <p>
          Bu alanda her kullanıcıya erişebileceği modülleri özel olarak atayabileceğiz – gerekli ise.
        </p>
      </div>
    </div>
  );
};

export default KullaniciYetkilendirme;
