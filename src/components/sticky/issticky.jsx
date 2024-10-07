import React, { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import styled, { css, keyframes } from "styled-components";

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const StyledSticky = styled.div`
  position: relative;
  width: 100%;
  transition: all 350ms ease-in-out;

  ${props => props.isSticky && css`
    position: fixed;
    top: ${props.fixedOn}px;
    left: 0;
    right: 0;
    z-index: 1500;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #ffffff; // Adjust as needed
    animation: ${slideDown} 400ms ease-in-out;
  `}
`;

const StickyNew = React.memo(({ fixedOn = 0, children, onSticky, scrollDistance = 100 }) => {
  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef(null);
  const [height, setHeight] = useState(0);

  const handleScroll = useCallback(() => {
    if (stickyRef.current) {
      const rect = stickyRef.current.getBoundingClientRect();
      const shouldBeSticky = rect.top <= fixedOn && window.scrollY >= scrollDistance;
      
      if (shouldBeSticky !== isSticky) {
        setIsSticky(shouldBeSticky);
        if (onSticky) {
          onSticky(shouldBeSticky);
        }
      }
    }
  }, [fixedOn, scrollDistance, isSticky, onSticky]);

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 10);
    window.addEventListener('scroll', debouncedHandleScroll);

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const updateHeight = debounce(() => {
      if (stickyRef.current) {
        setHeight(stickyRef.current.offsetHeight);
      }
    }, 100);

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <>
      <div style={{ height: isSticky ? height : 'auto' }} />
      <StyledSticky
        ref={stickyRef}
        isSticky={isSticky}
        fixedOn={fixedOn}
      >
        {children}
      </StyledSticky>
    </>
  );
});

export default StickyNew;