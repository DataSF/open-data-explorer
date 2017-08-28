import { connect } from 'react-redux'
import ModalShare from '../components/ModalShare'
import { showHideModal, copyLink } from '../actions'
import { withRouter } from 'react-router'
import qs from 'qs'

import { BASE_HREF } from '../constants/AppConstants'

const mapStateToProps = (state, ownProps) => {
  let queryState = Object.assign({}, state.query)
  delete queryState.isFetching
  const encodedJSON = qs.stringify(queryState, { arrayFormat: 'repeat' })
  const shareLink = BASE_HREF + ownProps.location.pathname + '?' + encodedJSON + '&utm_source=explorer&utm_medium=share_modal'
  return {
    showModal: state.ui.modals.share,
    shareLink
  }
}

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    showHideModal: () => dispatch(showHideModal('share')),
    onCopySnippet: (link) => dispatch(copyLink(link))
  }
)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalShare))