<LocalizeProvider >
<NavBar />
<Fullscreen
    enabled={isFullscreenEnabled}
    onChange={isFullscreenEnabled => setIsFullscreenEnabled(isFullscreenEnabled)}
    style={{'overflow': 'overlay'}}
  >
<VehiclesList />
</Fullscreen>
<Button
variant="outlined"
color="secondary"
onClick={() => setIsFullscreenEnabled(true)}>
  <FullscreenIcon />
  Go FullScreen
</Button>
  </LocalizeProvider>