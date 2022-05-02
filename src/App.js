import { ExpandMoreOutlined } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import { getByUsername, getAllUsers } from './api';

import { useDispatch, useSelector } from 'react-redux';
import {loadTenMore} from './usersSlice';
import {incrementByTen} from './perPageSlice';

export default function App() {
  const users = useSelector(state => state.users);
  const perPage = useSelector(state => state.perPage);

  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState();

  useEffect(() => {
    getAllUsers(10).then(data => { dispatch(loadTenMore(data)); console.log(data) }).catch(e => console.log('error', e));
    // eslint-disable-next-line
  }, [])

  const handleLoadMore = () => {
    getAllUsers(parseInt(perPage.value) + 10).then(data => { dispatch(loadTenMore(data)); console.log(data) }).catch(e => console.log('error', e));
    dispatch(incrementByTen());
  }




  const [expandLoading, setExpandLoading] = useState(true);
  const [expandContent, setExpandContent] = useState(false);
  const handleExpand = (u) => {
    if (expanded === u) {
      setExpanded(false);
    } else {
      setExpanded(u);
      setExpandLoading(true);
      getByUsername(u).then(data => setExpandContent(data)).then(() => setExpandLoading(false)).catch(e => console.log("error", e));
    }

  }


  return (
    <div className="main">
      <div className='content'>
        {users.value.map(u => <span key={u.login}>
          <Accordion
            className='user-card'
            expanded={expanded === u.login}
            onClick={() => handleExpand(u.login)}>
            <AccordionSummary
              expandIcon={<ExpandMoreOutlined />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Avatar src={u.avatar_url} sx={{ height: expanded === u.login ? '200px' : '100px', width: expanded === u.login ? '200px' : '100px', marginRight: '2vw', transitionDuration: '0.5s' }} />
              <div>
                <div className='user-name'>{u.login}</div>
                <a href={u.html_url}>{u.html_url}</a>
              </div>
            </AccordionSummary>
            <AccordionDetails
              className='user-card'
              sx={{ display: 'flex', justifyContent: expandLoading ? 'center' : 'start' }}>
              {expandLoading && <CircularProgress />}
              {!expandLoading && expandContent && <div>
                <span className='user-key'>Name</span><br /><span className='user-value'> {expandContent.name !== null ? expandContent.name : '-'}</span> <br /><br />
                <span className='user-key'>Followers</span><br /><span className='user-value'>{expandContent.followers !== null ? expandContent.followers : '-'}</span><br /><br />
                <span className='user-key'>Following</span><br /><span className='user-value'>{expandContent.following !== null ? expandContent.following : '-'}</span><br /><br />
                <span className='user-key'>Joined</span><br /><span className='user-value'>{expandContent.created_at !== null ? expandContent.created_at : '-'}</span><br /><br />
                <span className='user-key'>Company</span><br /><span className='user-value'>{expandContent.company !== null ? expandContent.company : '-'}</span><br /><br />
                <span className='user-key'>Email</span><br /><span className='user-value'>{expandContent.email !== null ? expandContent.email : '-'}</span><br /><br />
                <span className='user-key'>Location</span><br /> <span className='user-value'>{expandContent.location !== null ? expandContent.location : '-'}</span><br /><br />
                <span className='user-key'>Blog</span><br /><span className='user-value'>{expandContent.blog !== null ? <a href={expandContent.blog}>{expandContent.blog}</a> : '-'}</span><br /><br />
                <span className='user-key'>Bio</span><br /><span className='user-value'>{expandContent.bio !== null ? expandContent.bio : '-'}</span><br /><br />
              </div>}
            </AccordionDetails>
          </Accordion>
        </span>)}
      </div>
      <Button variant="contained" disabled={perPage.value >= 100} sx={{ margin: '1vh' }} size="medium" onClick={handleLoadMore}>
        Load more users
      </Button>
    </div>
  );
}