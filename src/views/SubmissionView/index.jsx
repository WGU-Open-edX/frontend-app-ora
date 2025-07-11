import React from 'react';

import { Col, Icon, Row } from '@openedx/paragon';
import { CheckCircle } from '@openedx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

// eslint-disable-next-line import/no-named-as-default
import Rubric from 'components/Rubric';
import ModalActions from 'components/ModalActions';
import FileUpload from 'components/FileUpload';
import Instructions from 'components/Instructions';
import StatusAlert from 'components/StatusAlert';

import SubmissionPrompts from './SubmissionPrompts';
import useSubmissionViewData from './hooks';

import './index.scss';

import messages from './messages';

const SubmissionView = () => {
  const {
    actionOptions,
    showRubric,
    response: {
      textResponses,
      uploadedFiles,
    },
    onUpdateTextResponse,
    isDraftSaved,
    onDeletedFile,
    onFileUploaded,
    isReadOnly,
    promptStatuses,
    fileUploadIsRequired,
  } = useSubmissionViewData();

  const { formatMessage } = useIntl();

  const draftIndicator = (!isReadOnly && isDraftSaved) && (
    <p className="d-flex text-primary">
      <Icon src={CheckCircle} />
      {formatMessage(messages.draftSaved)}
    </p>
  );

  return (
    <div className="assessment-content-layout mr-auto ml-auto">
      <div className="content-wrapper">
        <Row className="flex-nowrap m-0">
          <Col className="p-0">
            <div>
              <div className="d-flex justify-content-between">
                <h1>{formatMessage(messages.yourResponse)}</h1>
                {draftIndicator}
              </div>

              <StatusAlert hasSubmitted={actionOptions.hasSubmitted} />
              <Instructions />
              <SubmissionPrompts
                {...{
                  textResponses,
                  onUpdateTextResponse,
                  isReadOnly,
                  promptStatuses,
                }}
              />
              <FileUpload
                onDeletedFile={onDeletedFile}
                onFileUploaded={onFileUploaded}
                uploadedFiles={uploadedFiles}
                isReadOnly={isReadOnly}
                isInValid={fileUploadIsRequired}
              />
            </div>
            <ModalActions options={actionOptions} />
          </Col>
          {showRubric && <Rubric />}
        </Row>
      </div>
    </div>
  );
};

export default SubmissionView;
