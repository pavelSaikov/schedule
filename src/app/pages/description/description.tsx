import './description.scss';

import { Button, Divider } from 'antd';
import cloneDeep from 'lodash.clonedeep';
import React, { useCallback, useEffect, useMemo, useRef, useState, FC, MutableRefObject } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';

import { OrganizerCell } from '../../common/components';
import {
  appModeSelector,
  timeZoneSelector,
} from '../../common/components/common-header/store/common-header.selectors';
import { uploadEventCategories } from '../../common/components/common-header/store/common-header.thunks';
import { OrganizerEditor } from '../../common/components/organizer-editor/organizer-editor';
import {
  AppMode,
  IEvent,
  IEventCategory,
  ILinkWithDescription,
  RowCategoryName,
  TimeZone,
} from '../../models/app.models';
import { AppRoutes } from '../../routes/routes';
import { eventsSelector, eventCategoriesSelector } from '../../store/app.selectors';
import {
  AddVideoModal,
  DescriptionHeader,
  Map,
  TaskDates,
  TaskDescription,
  TaskLinks,
  VideoList,
} from './components';
import { ICoordinates } from './components/map/map.models';
import { UserFeedbackForm } from './components/user-feedback-form/user-feedback-form';
import { uploadUpdatedEvent } from './store/description.thunks';
import { QuestionForm } from './components/question-form/question-form';
import { PhotoList } from './components/photo-list/photo-list';
import { AddPhotoModal } from './components/add-photo-modal/add-photo-modal';

export const DescriptionPage: FC = () => {
  const { id } = useParams();
  const history = useHistory();

  const dispatch = useDispatch();
  const appMode: AppMode = useSelector(appModeSelector);
  const timeZone: TimeZone = useSelector(timeZoneSelector);
  const events: IEvent[] = useSelector(eventsSelector);
  const eventCategories: IEventCategory[] = useSelector(eventCategoriesSelector);

  const [eventCategoriesWithoutDeadline, setEventCategoriesWithoutDeadline] = useState<IEventCategory[]>();
  const [event, setEvent] = useState<IEvent>();
  const [eventCategory, setEventCategory] = useState<IEventCategory>();
  const [title, setTitle] = useState<string>();
  const [organizer, setOrganizer] = useState<string>();
  const [startDateTime, setStartDateTime] = useState<string>();
  const [deadlineDateTime, setDeadlineDateTime] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [links, setLinks] = useState<ILinkWithDescription[]>();
  const [videos, setVideos] = useState<string[]>();
  const [photos, setPhotos] = useState<string[]>();
  const [coordinates, setCoordinates] = useState<ICoordinates>();
  const [isFeedbackAvailable, setIsFeedbackAvailable] = useState<boolean>();
  const [, setFeedbacks] = useState<string[]>();
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [isQuestionsAvailable, setIsQuestionFormAvailable] = useState<boolean>();
  const [, setQuestions] = useState<string[]>();
  const [isQuestionSubmitted, setIsQuestionSubmitted] = useState(false);

  const [isOrganizerModalVisible, setIsOrganizerModalVisible] = useState(false);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false);

  const eventCategoriesAbortControllerRef: MutableRefObject<AbortController> = useRef<AbortController>();
  const eventAbortControllerRef: MutableRefObject<AbortController> = useRef<AbortController>();
  const updatedEventRef: MutableRefObject<IEvent> = useRef();

  useEffect(() => {
    const currentEvent: IEvent = cloneDeep(events.find(e => e.id === id));

    if (!currentEvent) {
      history.push(`/${AppRoutes.main}`);
      return;
    }

    setEvent(currentEvent);
    updatedEventRef.current = cloneDeep(currentEvent);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!event) {
      return;
    }

    setEventCategory(cloneDeep(eventCategories.find(e => e.categoryName === event.eventCategoryName)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  useEffect(
    () =>
      setEventCategoriesWithoutDeadline(
        cloneDeep(eventCategories.filter(e => e.categoryName !== RowCategoryName.deadline)),
      ),
    [eventCategories],
  );

  useEffect(() => {
    if (!event) {
      return;
    }

    setTitle(event.title);
    setOrganizer(event.organizer);
    setStartDateTime(event.dateTime);
    setDeadlineDateTime(event.deadlineDate);
    setDescription(event.description);
    setLinks(cloneDeep(event.links));
    setVideos(cloneDeep(event.videos));
    setPhotos(cloneDeep(event.images));
    setCoordinates(cloneDeep(event.mapCoordinates));
    setIsFeedbackAvailable(event.isFeedbackAvailable);
    setFeedbacks(cloneDeep(event.feedbacks));
    setIsQuestionFormAvailable(event.isQuestionFormAvailable);
    setQuestions(event.questions);
  }, [event]);

  useEffect(
    () =>
      setEventCategory(oldEventCategory => {
        if (!oldEventCategory) {
          return;
        }

        return {
          ...eventCategories.find(e => e.categoryName === oldEventCategory.categoryName),
        };
      }),
    [eventCategories],
  );

  const uploadEvent = useCallback(() => {
    eventAbortControllerRef.current ? eventAbortControllerRef.current.abort() : null;
    const newAbortController = new AbortController();
    dispatch(uploadUpdatedEvent(cloneDeep(updatedEventRef.current), newAbortController));
    eventAbortControllerRef.current = newAbortController;
  }, [dispatch]);

  const onEventCategoryEdit = useCallback(
    (updatedEventCategories: IEventCategory[], selectedEventCategory: IEventCategory) => {
      setEventCategory({ ...selectedEventCategory });
      updatedEventRef.current.eventCategoryName = selectedEventCategory.categoryName;
      uploadEvent();

      const abortController = new AbortController();
      eventCategoriesAbortControllerRef.current ? eventCategoriesAbortControllerRef.current.abort() : null;
      eventCategoriesAbortControllerRef.current = abortController;
      dispatch(
        uploadEventCategories(
          cloneDeep([
            ...updatedEventCategories,
            eventCategories.find(e => e.categoryName === RowCategoryName.deadline),
          ]),
          abortController,
        ),
      );
    },
    [dispatch, eventCategories, uploadEvent],
  );

  const onTitleEdit = useCallback(
    (newTitle: string) => {
      setTitle(newTitle);
      updatedEventRef.current.title = newTitle;
      uploadEvent();
    },
    [uploadEvent],
  );

  const onOpenModalForEditingOrganizer = useCallback(() => setIsOrganizerModalVisible(true), []);
  const onCloseModalForEditingOrganizer = useCallback(() => setIsOrganizerModalVisible(false), []);

  const onOrganizerEdit = useCallback(
    (newOrganizer: string) => {
      setOrganizer(newOrganizer);
      updatedEventRef.current.organizer = newOrganizer;
      uploadEvent();
      setIsOrganizerModalVisible(false);
    },
    [uploadEvent],
  );

  const onChangeStartDateTime = useCallback(
    (newStartDateTime: string) => {
      setStartDateTime(newStartDateTime);
      updatedEventRef.current.dateTime = newStartDateTime;
      uploadEvent();
    },
    [uploadEvent],
  );

  const onChangeDeadlineDateTime = useCallback(
    (newDeadlineDateTime: string) => {
      setDeadlineDateTime(newDeadlineDateTime);
      updatedEventRef.current.deadlineDate = newDeadlineDateTime;
      uploadEvent();
    },
    [uploadEvent],
  );

  const onDescriptionChange = useCallback(
    (newDescription: string) => {
      setDescription(newDescription);
      updatedEventRef.current.description = newDescription;
      uploadEvent();
    },
    [uploadEvent],
  );

  const onModifyLinks = useCallback(
    (newLinks: ILinkWithDescription[]) => {
      setLinks(newLinks);
      updatedEventRef.current.links = cloneDeep(newLinks);
      uploadEvent();
    },
    [uploadEvent],
  );

  const linksComponent = useMemo(() => {
    if (!links) {
      return null;
    }

    return (
      ((appMode === AppMode.student && links.length) || appMode === AppMode.mentor) && (
        <>
          <Divider orientation="left">Links</Divider>
          <TaskLinks appMode={appMode} taskLinks={links} onModifyLinks={onModifyLinks} />
        </>
      )
    );
  }, [appMode, links, onModifyLinks]);

  const onOpenVideoModal = useCallback(() => setIsVideoModalVisible(true), []);
  const onCloseVideoModal = useCallback(() => setIsVideoModalVisible(false), []);

  const onRemoveVideo = useCallback(
    (url: string) =>
      setVideos(oldVideos => {
        const newVideos = oldVideos.filter(v => v !== url);
        updatedEventRef.current.videos = cloneDeep(newVideos);
        uploadEvent();
        return newVideos;
      }),
    [uploadEvent],
  );
  const onAddNewVideo = useCallback(
    (url: string) => {
      setVideos(oldVideos => {
        const newVideos = [...oldVideos, url];
        updatedEventRef.current.videos = cloneDeep(newVideos);
        uploadEvent();
        return newVideos;
      });
      setIsVideoModalVisible(false);
    },
    [uploadEvent],
  );

  const videosComponent = useMemo(() => {
    if (!videos || !eventCategory) {
      return null;
    }
    const isAnyVideos: boolean = videos.length ? true : false;
    const isPermissionsEnough: boolean = eventCategory.permissions.isVideosAvailable;
    const isMentorMode: boolean = appMode === AppMode.mentor;

    return isPermissionsEnough && (isMentorMode || isAnyVideos) ? (
      <>
        <Divider orientation="left">Videos</Divider>
        <VideoList
          videoUrls={videos}
          appMode={appMode}
          onRemoveVideoClick={onRemoveVideo}
          onAddVideoClick={onOpenVideoModal}
        />
      </>
    ) : null;
  }, [appMode, eventCategory, onOpenVideoModal, onRemoveVideo, videos]);

  const onOpenPhotoModal = useCallback(() => setIsPhotoModalVisible(true), []);
  const onClosePhotoModal = useCallback(() => setIsPhotoModalVisible(false), []);
  const onRemovePhoto = useCallback(
    (url: string) =>
      setPhotos(oldPhotos => {
        const newPhotos = oldPhotos.filter(v => v !== url);
        updatedEventRef.current.images = cloneDeep(newPhotos);
        uploadEvent();
        return newPhotos;
      }),
    [uploadEvent],
  );

  const onAddNewPhoto = useCallback(
    (url: string) => {
      setPhotos(oldPhotos => {
        const newPhotos = [...oldPhotos, url];
        updatedEventRef.current.images = cloneDeep(newPhotos);
        uploadEvent();
        return newPhotos;
      });
      setIsPhotoModalVisible(false);
    },
    [uploadEvent],
  );

  const photosComponent = useMemo(() => {
    if (!photos || !eventCategory) {
      return null;
    }
    const isAnyPhotos: boolean = photos.length ? true : false;
    const isPermissionsEnough: boolean = eventCategory.permissions.isPhotosAvailable;
    const isMentorMode: boolean = appMode === AppMode.mentor;

    return isPermissionsEnough && (isMentorMode || isAnyPhotos) ? (
      <>
        <Divider orientation="left">Photos</Divider>
        <PhotoList
          photoUrls={photos}
          appMode={appMode}
          onRemovePhotoClick={onRemovePhoto}
          onAddPhotoClick={onOpenPhotoModal}
        />
      </>
    ) : null;
  }, [appMode, eventCategory, onOpenPhotoModal, onRemovePhoto, photos]);

  const onCoordinatesChange = useCallback(
    (coordinates: ICoordinates) => {
      setCoordinates(coordinates);
      updatedEventRef.current.mapCoordinates = cloneDeep(coordinates);
      uploadEvent();
    },
    [uploadEvent],
  );

  const mapComponent = useMemo(() => {
    if (!eventCategory) {
      return;
    }

    const isMentorMode: boolean = appMode === AppMode.mentor;
    const isCoordinatesExist: boolean = coordinates !== null;
    const isEnoughPermissions: boolean = eventCategory.permissions.isMapAvailable;

    return isEnoughPermissions && (isMentorMode || isCoordinatesExist) ? (
      <>
        <Divider orientation="left">Map</Divider>
        <Map appMode={appMode} markerCoordinates={coordinates} onCoordinatesChange={onCoordinatesChange} />
      </>
    ) : null;
  }, [appMode, coordinates, eventCategory, onCoordinatesChange]);

  const onChangeFeedbackStatus = useCallback(
    (status: boolean) => {
      setIsFeedbackAvailable(status);
      updatedEventRef.current.isFeedbackAvailable = status;
      uploadEvent();
    },
    [uploadEvent],
  );

  const onFeedbackSubmit = useCallback(
    (feedback: string) => {
      setFeedbacks(feedbacks => {
        const newFeedbacks = [...feedbacks, feedback];
        updatedEventRef.current.feedbacks = [...feedbacks, feedback];
        uploadEvent();
        return newFeedbacks;
      });
      setIsFeedbackSubmitted(true);
    },
    [uploadEvent],
  );

  const feedbackComponent = useMemo(() => {
    if (!eventCategory) {
      return;
    }

    const isMentorMode: boolean = appMode === AppMode.mentor;

    return isMentorMode || (isFeedbackAvailable && !isFeedbackSubmitted) ? (
      <>
        <Divider orientation="left">Feedback form</Divider>
        <UserFeedbackForm
          appMode={appMode}
          isFeedbackEnabled={isFeedbackAvailable}
          onChangeFeedbackStatus={onChangeFeedbackStatus}
          onFeedbackSubmit={onFeedbackSubmit}
        />
      </>
    ) : null;
  }, [
    appMode,
    eventCategory,
    isFeedbackAvailable,
    isFeedbackSubmitted,
    onChangeFeedbackStatus,
    onFeedbackSubmit,
  ]);

  const onQuestionStatusChange = useCallback(
    (status: boolean) => {
      setIsQuestionFormAvailable(status);
      updatedEventRef.current.isQuestionFormAvailable = status;
      uploadEvent();
    },
    [uploadEvent],
  );

  const onQuestionSubmit = useCallback(
    (question: string) => {
      setIsQuestionSubmitted(true);
      setQuestions(questions => {
        const newQuestions = [...questions, question];
        updatedEventRef.current.questions = [...newQuestions];
        uploadEvent();
        return newQuestions;
      });
    },
    [uploadEvent],
  );

  const questionFormComponent = useMemo(() => {
    if (!eventCategory) {
      return;
    }

    const isMentorMode: boolean = appMode === AppMode.mentor;

    return isMentorMode || (isQuestionsAvailable && !isQuestionSubmitted) ? (
      <>
        <Divider orientation="left">Question Form</Divider>
        <QuestionForm
          appMode={appMode}
          isQuestionEnabled={isQuestionsAvailable}
          onChangeQuestionStatus={onQuestionStatusChange}
          onQuestionSubmit={onQuestionSubmit}
        />
      </>
    ) : null;
  }, [
    appMode,
    eventCategory,
    isQuestionSubmitted,
    isQuestionsAvailable,
    onQuestionStatusChange,
    onQuestionSubmit,
  ]);

  return (
    <div className="description_wrapper">
      {null}
      <Button className="description_back-button" type="primary">
        <Link to={`/${AppRoutes.main}`}>Back</Link>
      </Button>
      {eventCategory &&
        title &&
        organizer &&
        startDateTime &&
        deadlineDateTime !== null &&
        description &&
        links && (
          <>
            <div className="description_info-container">
              <DescriptionHeader
                appMode={appMode}
                availableEventCategories={eventCategoriesWithoutDeadline}
                defaultEventCategory={eventCategory}
                defaultTitle={title}
                onEventCategoryEdit={onEventCategoryEdit}
                onTitleEdit={onTitleEdit}
              />
              <div className="description_content-wrapper">
                <Divider orientation="left">Organizer</Divider>
                <OrganizerCell
                  appMode={appMode}
                  gitLink={'https://github.com/' + organizer}
                  onEditClick={onOpenModalForEditingOrganizer}
                />
                <Divider orientation="left">Dates</Divider>
                <TaskDates
                  appMode={appMode}
                  startDateTime={startDateTime}
                  deadlineDateTime={deadlineDateTime}
                  timeZone={timeZone}
                  onChangeStartDate={onChangeStartDateTime}
                  onChangeDeadlineDate={onChangeDeadlineDateTime}
                />
                <Divider orientation="left">Description</Divider>
                <TaskDescription
                  appMode={appMode}
                  taskDescription={description}
                  onDescriptionChange={onDescriptionChange}
                />
                {linksComponent}
                {videosComponent}
                {photosComponent}
                {mapComponent}
                {feedbackComponent}
                {questionFormComponent}
              </div>
            </div>
            <OrganizerEditor
              onCancelClick={onCloseModalForEditingOrganizer}
              onOrganizerEdit={onOrganizerEdit}
              visible={isOrganizerModalVisible}
              organizer={organizer}
            />
            <AddVideoModal
              onAddVideo={onAddNewVideo}
              visible={isVideoModalVisible}
              onCancelClick={onCloseVideoModal}
            />
            <AddPhotoModal
              onAddPhoto={onAddNewPhoto}
              visible={isPhotoModalVisible}
              onCancelClick={onClosePhotoModal}
            />
          </>
        )}
    </div>
  );
};
