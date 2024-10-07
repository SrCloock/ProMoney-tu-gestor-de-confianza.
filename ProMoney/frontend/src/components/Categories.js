import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { icons } from '../utils/icons';
import './Categories.css';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';


Modal.setAppElement('#root');

const Categories = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ group: '', name: '', icon: icons[0] });
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);


  useEffect(() => {
    fetchCategories();
  }, []);


  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error(t('errorFetchingCategories'), error.response ? error.response.data : error.message);
    }
  };


  const handleInputChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };


  const handleIconChange = (e) => {
    setNewCategory({ ...newCategory, icon: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', newCategory);
    try {
      if (isEditing) {
        await updateCategory();
      } else {
        await createCategory();
      }
    } catch (error) {
      console.error(t('errorSubmittingForm'), error.response ? error.response.data : error.message);
    }
  };

  const createCategory = async () => {
    try {
      await axios.post('http://localhost:5000/api/categories', newCategory);
      fetchCategories();
      setNewCategory({ group: '', name: '', icon: icons[0] });
    } catch (error) {
      console.error(t('errorCreatingCategory'), error.response ? error.response.data : error.message);
    }
  };

  const updateCategory = async () => {
    try {
      await axios.put(`http://localhost:5000/api/categories/${currentCategory._id}`, newCategory);
      fetchCategories();
      setNewCategory({ group: '', name: '', icon: icons[0] });
      setIsEditing(false);
      closeModal();
    } catch (error) {
      console.error(t('errorUpdatingCategory'), error.response ? error.response.data : error.message);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories();
      closeModal();
    } catch (error) {
      console.error(t('errorDeletingCategory'), error.response ? error.response.data : error.message);
    }
  };

  const editCategory = (category) => {
    setNewCategory(category);
    setIsEditing(true);
    setCurrentCategory(category);
    openModal();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  const renderCategoriesByGroup = (group) => {
    return categories
      .filter((category) => category.group === group)
      .map((category) => (
        <div key={category._id} className="category-item" onClick={() => editCategory(category)}>
          <span className="category-icon">{category.icon}</span>
          <span className="category-name">{category.name}</span>
        </div>
      ));
  };

  return (
    <div className="categories-container">
      <h1>{t('categoryManagement')}</h1>
      

      <form onSubmit={handleSubmit} className="category-form">
        <div className="form-group">
          <label htmlFor="group">{t('group')}</label>
          <select
            id="group"
            name="group"
            value={newCategory.group}
            onChange={handleInputChange}
            required
          >
            <option value="">{t('selectGroup')}</option>
            <option value="Gastos">{t('expenses')}</option>
            <option value="Ahorros">{t('savings')}</option>
            <option value="Ganancias">{t('income')}</option>
            <option value="Cryptos">{t('cryptos')}</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="name">{t('name')}</label>
          <input
            id="name"
            type="text"
            name="name"
            value={newCategory.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="icon">{t('icon')}</label>
          <select
            id="icon"
            name="icon"
            value={newCategory.icon}
            onChange={handleIconChange}
          >
            {icons.map((icon, index) => (
              <option key={index} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </div>

        <div className="button-container">
          <button type="submit" className="submit-button">
            {isEditing ? t('updateCategory') : t('createCategory')}
          </button>
        </div>
      </form>

      <h2>{t('existingCategories')}</h2>
      <div className="category-tables">
        <div className="category-column">
          <h3>{t('income')}</h3>
          {renderCategoriesByGroup('Ganancias')}
        </div>
        <div className="category-column">
          <h3>{t('expenses')}</h3>
          {renderCategoriesByGroup('Gastos')}
        </div>
        <div className="category-column">
          <h3>{t('savings')}</h3>
          {renderCategoriesByGroup('Ahorros')}
        </div>
        <div className="category-column">
          <h3>{t('cryptos')}</h3>
          {renderCategoriesByGroup('Cryptos')}
        </div>
      </div>


      {currentCategory && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel={t('editCategory')}>
          <h2>{t('editCategory')}</h2>
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-group">
              <label htmlFor="group">{t('group')}</label>
              <select
                id="group"
                name="group"
                value={newCategory.group}
                onChange={handleInputChange}
                required
              >
                <option value="">{t('selectGroup')}</option>
                <option value="Gastos">{t('expenses')}</option>
                <option value="Ahorros">{t('savings')}</option>
                <option value="Ganancias">{t('income')}</option>
                <option value="Cryptos">{t('cryptos')}</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="name">{t('name')}</label>
              <input
                id="name"
                type="text"
                name="name"
                value={newCategory.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="icon">{t('icon')}</label>
              <select
                id="icon"
                name="icon"
                value={newCategory.icon}
                onChange={handleIconChange}
              >
                {icons.map((icon, index) => (
                  <option key={index} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="button-container">
              <button type="submit" className="submit-button">
                {t('saveChanges')}
              </button>
              <button type="button" onClick={() => deleteCategory(currentCategory._id)} className="delete-button">
                {t('deleteCategory')}
              </button>
              <button type="button" onClick={closeModal} className="close-button">
                {t('close')}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Categories;
