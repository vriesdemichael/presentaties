<template>
  <div class="subagent-session-slide">
    <h1>Tools: Subagents</h1>
    <div class="subagent-session-grid">
      <div class="subagent-panel">
        <div class="subagent-badge">Subagent</div>
        <div class="subagent-window">
          <div class="subagent-header">
            <span class="subagent-title">Main session</span>
          </div>

          <div class="subagent-chat-card">
            <div class="subagent-line subagent-line-user">
              <span class="subagent-avatar subagent-avatar-user">
                <img src="/images/happy-dev.jpg" alt="Happy developer avatar" />
              </span>
              <div class="subagent-message subagent-message-user">Implement dark mode toggle.</div>
            </div>
            <div class="subagent-line subagent-line-agent">
              <div class="subagent-message subagent-message-agent">Ok, done.</div>
              <span class="subagent-avatar subagent-avatar-agent subagent-avatar-helpful">
                <img src="/images/agent-avatar.png" alt="Helpful agent avatar" />
              </span>
            </div>
          </div>

          <div class="subagent-chat-card subagent-chat-card-review">
            <div class="subagent-line subagent-line-user">
              <span class="subagent-avatar subagent-avatar-user">
                <img src="/images/happy-dev.jpg" alt="Happy developer avatar" />
              </span>
              <div class="subagent-message subagent-message-user">Review using grumpy reviewer skill.</div>
            </div>
            <div class="subagent-event">grumpy reviewer skill activated</div>
            <div class="subagent-line subagent-line-agent">
              <div class="subagent-message subagent-message-review">Here are 10 things that were utterly garbage.</div>
              <span class="subagent-avatar subagent-avatar-agent">
                <img src="/images/grumpy-dev.jpg" alt="Grumpy developer avatar" />
              </span>
            </div>
            <div class="subagent-line subagent-line-user">
              <span class="subagent-avatar subagent-avatar-user">
                <img src="/images/happy-dev.jpg" alt="Happy developer avatar" />
              </span>
              <div class="subagent-message subagent-message-user">Implement fixes for these issues found in the review.</div>
            </div>
            <div class="subagent-line subagent-line-agent">
              <div class="subagent-message subagent-message-review">Go do it yourself.</div>
              <span class="subagent-avatar subagent-avatar-agent">
                <img src="/images/grumpy-dev.jpg" alt="Grumpy developer avatar" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="subagent-copy">
        <p class="subagent-lead">In dezelfde sessie kan een tijdelijke reviewer-persona blijven hangen en je volgende gewone opdracht overnemen.</p>

        <div class="subagent-callouts">
          <div class="subagent-callout">
            <div class="subagent-callout-label">Setup</div>
            <p>Je begint normaal, maar activeert later een skill met een tweede persona.</p>
          </div>
          <div class="subagent-callout subagent-callout-highlight">
            <div class="subagent-callout-label">Gevolg</div>
            <p>Die reviewer-rol blijft daarna op alles reageren, ook op gewone vervolgopdrachten.</p>
          </div>
          <div class="subagent-callout">
            <div class="subagent-callout-label">Daarom</div>
            <p>Zet zulke specialistische rollen in een aparte subagent-sessie in plaats van in je hoofdgesprek.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.subagent-session-slide {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  height: 100%;
}

.subagent-session-slide h1 {
  margin: 0;
}

.subagent-session-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(16rem, 0.92fr);
  gap: 1rem;
  align-items: start;
}

.subagent-panel {
  padding: 0.8rem 0.85rem 0.85rem;
  border-radius: 1rem;
  border: 2px solid #8fcae7;
  background: linear-gradient(180deg, #ffffff 0%, #f7fbfd 100%);
  box-shadow: 0 0.7rem 1.5rem rgba(21, 66, 115, 0.05);
}

.subagent-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  background: #ddeff8;
  color: #154273;
  font-size: 0.92rem;
  font-weight: 800;
}

.subagent-window {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-top: 0.7rem;
  padding: 0.72rem;
  border-radius: 0.95rem;
  border: 1px solid rgba(143, 202, 231, 0.72);
  background: linear-gradient(180deg, #f9fcfe 0%, #ffffff 100%);
}

.subagent-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.6rem;
  padding-bottom: 0.52rem;
  border-bottom: 1px solid rgba(143, 202, 231, 0.45);
}

.subagent-title {
  font-size: 0.8rem;
  font-weight: 800;
  color: #154273;
}

.subagent-chat-card {
  display: flex;
  flex-direction: column;
  gap: 0.42rem;
  padding: 0;
  border-radius: 0;
  background: transparent;
  border: 0;
}

.subagent-chat-card-review {
  gap: 0.55rem;
}

.subagent-event {
  align-self: center;
  padding: 0.22rem 0.62rem;
  border-radius: 999px;
  background: rgba(255, 241, 214, 0.96);
  border: 1px solid rgba(247, 181, 0, 0.34);
  color: #8a4b00;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.subagent-line {
  display: flex;
  align-items: flex-end;
  gap: 0.32rem;
  width: 100%;
}

.subagent-line-user {
  justify-content: flex-start;
}

.subagent-line-agent {
  justify-content: flex-end;
}

.subagent-avatar {
  width: 1.22rem;
  height: 1.22rem;
  border-radius: 999px;
  display: inline-block;
  flex: 0 0 auto;
  overflow: hidden;
  background: #ddeff8;
  border: 1px solid rgba(143, 202, 231, 0.75);
  box-shadow: 0 0.18rem 0.4rem rgba(21, 66, 115, 0.12);
}

.subagent-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.7);
}

.subagent-avatar-user img {
  object-position: 52% 20%;
}

.subagent-avatar-agent img {
  object-position: 46% 18%;
}

.subagent-avatar-helpful img {
  transform: scale(1.05);
  object-position: 50% 44%;
}

.subagent-message {
  padding: 0.34rem 0.48rem;
  border-radius: 0.68rem;
  font-size: 0.66rem;
  font-weight: 700;
  line-height: 1.22;
  max-width: 84%;
}

.subagent-message-user {
  background: #f2f8fb;
  color: rgba(21, 66, 115, 0.84);
  border: 1px solid rgba(143, 202, 231, 0.5);
}

.subagent-message-agent {
  background: #ffffff;
  color: #154273;
  border: 1px solid rgba(143, 202, 231, 0.68);
}

.subagent-message-review {
  background: rgba(255, 241, 214, 0.96);
  color: #8a4b00;
  border: 1px solid rgba(247, 181, 0, 0.34);
}

.subagent-copy {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 0.05rem;
}

.subagent-lead {
  margin: 0;
  font-size: 1.02rem;
  line-height: 1.3;
}

.subagent-callouts {
  display: grid;
  gap: 0.6rem;
}

.subagent-callout {
  padding: 0.75rem 0.8rem;
  border-radius: 0.9rem;
  border: 1px solid rgba(143, 202, 231, 0.65);
  background: rgba(255, 255, 255, 0.88);
}

.subagent-callout-highlight {
  background: linear-gradient(180deg, #eef7fb 0%, #ffffff 100%);
}

.subagent-callout-label {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(21, 66, 115, 0.6);
}

.subagent-callout p {
  margin: 0.35rem 0 0;
  font-size: 0.88rem;
  line-height: 1.28;
}
</style>