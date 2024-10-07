import React from 'react';
import { useTranslation } from 'react-i18next';
import './Updates.css';

const Updates = () => {
  const { t } = useTranslation();

  return (
    <div className="improves-container">
      <h1>{t('improves.title')}</h1>
      <p>{t('improves.description')}</p>
      <ul>
        <li>{t('improves.feature1')}</li>
        <li>{t('improves.feature2')}</li>
        <li>{t('improves.feature3')}</li>
        <li>{t('improves.feature4')}</li>
        <li>{t('improves.feature5')}</li>
        <li>{t('improves.feature6')}</li>
        <li>{t('improves.feature7')}</li>
        <li>{t('improves.feature8')}</li>
        <li>{t('improves.feature9')}</li>
        <li>{t('improves.feature10')}</li>
        <li>{t('improves.feature11')}</li>
        <li>{t('improves.feature12')}</li>
        <li>{t('improves.feature13')}</li>
        <li>{t('improves.feature14')}</li>
        <li>{t('improves.feature15')}</li>
      </ul>
    </div>
  );
};

export default Updates;
