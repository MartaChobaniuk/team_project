import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StepThree.module.scss';
import arrow from '../../images/icons/arrow_back.svg';
import { Path } from '../../utils/constants';
import { useOpportunityContext } from '../../store/OpportunityContex';

export const StepThree = () => {
  const navigate = useNavigate();
  const { stepThreeData, setStepThreeData } = useOpportunityContext();

  useEffect(() => {
    if (stepThreeData) {
      localStorage.setItem('stepThreeData', JSON.stringify(stepThreeData));
    }
  }, [stepThreeData]);

  useEffect(() => {
    const storedData = localStorage.getItem('stepThreeData');

    if (storedData) {
      setStepThreeData(JSON.parse(storedData));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    return file;
  };

  const addDocument = () => {
    setStepThreeData(prevState => ({
      ...prevState,
      documents: [
        ...prevState.documents,
        { file: null, id: prevState.documents.length + 1 },
      ],
    }));
  };

  const removeDocument = (id: number) => {
    setStepThreeData(prevState => ({
      ...prevState,
      documents: prevState.documents.filter(doc => doc.id !== id),
    }));
  };

  // prettier-ignore
  const handleDynamicFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    const newDocuments = stepThreeData.documents.map(doc =>
      doc.id === id
        ? {
          ...doc,
          file: e.target.files && e.target.files.length > 0
            ? e.target.files[0]
            : null,
        }
        : doc,
    );

    setStepThreeData((prevState) => ({
      ...prevState,
      documents: newDocuments,
    }));
  };

  return (
    <div className={styles.three}>
      <div className={styles.three__nav}>
        <div className={styles['three__right-side']}>
          <div
            className={styles['three__bllock-top']}
            onClick={() => navigate(Path.StepTwo)}
          >
            <img src={arrow} alt="arrow" className={styles.three__img} />
            <p className={styles.three__back}>Go Back</p>
          </div>
          <div className={styles['three__bllock-bottom']}>
            <h1 className={styles.three__title}>New Opportunity</h1>
            <h3 className={styles.three__subtitle}>
              Step 3/3. Upload Files & Documents
            </h3>
          </div>
        </div>
        <div className={styles['three__left-side']}>
          <p className={styles.three__content}>
            Upload a description (file or link to Google Docs), supporting
            documents (like permits or plans), and a cover image to attract
            attention. These extras help users understand the impact of your
            opportunity and how they can get involved.
          </p>
          <div className={styles.three__form}>
            <form action="">
              <div className={styles['three__input-shell']}>
                <input
                  className={styles.three__input}
                  type="file"
                  id="firstFile"
                  accept=".jpg,.png,.pdf"
                  onChange={e => handleFileChange(e)}
                  placeholder="Upload cover for your wish"
                  data-placeholder="Upload cover for your wish"
                  data-has-file={stepThreeData.firstFile ? 'true' : 'false'}
                  required
                />
                <label
                  htmlFor="firstFile"
                  className={`
                    ${styles['custom-file-label']}
                    ${!stepThreeData.firstFile ? styles['no-file-selected'] : ''}`}
                >
                  {stepThreeData.firstFile
                    ? stepThreeData.firstFile.name
                    : 'Upload cover for your wish'}
                </label>
                <button className={styles['three__button-upload']}>
                  Upload file
                </button>
              </div>
              <div className={styles['three__line--upload']}></div>
              <p className={styles.three__remark}>
                *Required. Max image size - 10 MB. File type - JPG, PNG, PDF.
              </p>
              <div className={styles['three__input-shell']}>
                <input
                  className={styles.three__input}
                  id="secondFile"
                  type="file"
                  accept=".doc,.docx,.pdf"
                  onChange={e => handleFileChange(e)}
                  placeholder="Upload wish description file"
                  data-placeholder="Upload wish description file"
                  data-has-file={stepThreeData.secondFile ? 'true' : 'false'}
                  required
                />
                <label
                  htmlFor="secondFile"
                  className={`
                    ${styles['custom-file-label']}
                    ${!stepThreeData.secondFile ? styles['no-file-selected'] : ''}`}
                >
                  {stepThreeData.secondFile
                    ? stepThreeData.secondFile.name
                    : 'Upload wish description file'}
                </label>
                <button className={styles['three__button-upload']}>
                  Upload file
                </button>
              </div>
              <div className={styles['three__line--upload']}></div>
              <p className={styles.three__remark}>
                *Required. File type - DOC, DOCX, PDF.
              </p>
              <input
                className={styles['three__input--dosc']}
                type="text"
                /* eslint-disable max-len */
                placeholder="Or provide a link to the Google Docs file with the wish information"
                required
              />
              <div className={styles.three__line}></div>
              <p className={styles.three__remark}>
                *Required. Link to the Google Docs with the description.
              </p>
              <div className={styles['three__doc-block']}>
                <p className={styles.three__pretitle}>
                  Upload all required documents that confirm your situation and
                  the needs:
                </p>
                <div className={styles.three__documents}>
                  {stepThreeData.documents.map(doc => (
                    <React.Fragment key={doc.id}>
                      <div className={styles['three__input-doc-shell']}>
                        <input
                          className={styles['three__input-doc']}
                          id={`file-${doc.id}`}
                          type="file"
                          accept=".doc,.docx,.pdf"
                          onChange={e => handleDynamicFileChange(e, doc.id)}
                          placeholder="Upload a document"
                          data-placeholder="Upload a document"
                          data-has-file={doc.file ? 'true' : 'false'}
                        />
                        <label
                          htmlFor={`file-${doc.id}`}
                          className={`${styles['custom-file-label']} ${!doc.file ? styles['no-file-selected'] : ''}`}
                        >
                          {doc.file ? doc.file.name : 'Upload a document'}
                        </label>
                        <button className={styles['three__button-doc-upload']}>
                          Upload file
                        </button>
                        <button
                          className={styles['three__button-doc-remove']}
                          onClick={() => removeDocument(doc.id)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className={styles['three__line-doc']}></div>
                      <p className={styles.three__remark}>
                        File type - DOC, DOCX, PDF.
                      </p>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className={styles['three__block-add-button']}>
                <button
                  onClick={addDocument}
                  className={styles['three__button-add-doc']}
                >
                  Add new file
                </button>
              </div>
              <div className={styles.three__buttons}>
                <button
                  className={styles['three__button-prev']}
                  onClick={() => navigate(Path.StepTwo)}
                >
                  Previous Step
                </button>
                <button className={styles['three__button-submit']}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
