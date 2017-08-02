import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import CopySnippet from '../CopySnippet'

const ModalShare = ({showModal, showHideModal, shareLink}) => (
  <Modal show={showModal} onHide={showHideModal}>
    <Modal.Header closeButton>
      <Modal.Title>Share</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <CopySnippet title='Shareable link' help='Copy the link below to share this chart with others' snippet={shareLink} />
    </Modal.Body>
    <Modal.Footer>
      <Button bsSize={'small'} onClick={showHideModal}>Close</Button>
    </Modal.Footer>
  </Modal>
)

export default ModalShare