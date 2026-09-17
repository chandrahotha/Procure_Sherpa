/* ==========================================================
   Procure Sherpa v2.0 - Local User Profile & Account Management
   100% Offline, zero-backend, privacy-first local state
   ========================================================== */

PS.K.user = 'ps_user_profile';

PS.USER_ROLES = [
  { id: 'beginner', title: 'Procurement Beginner & Enthusiast', desc: 'Focus on core principles, spending fundamentals, and guided Academy journeys.' },
  { id: 'buyer', title: 'Junior Buyer / Category Specialist', desc: 'Active execution of tenders, RFQs, quote comparisons, and supplier evaluations.' },
  { id: 'manager', title: 'Sourcing Manager / Category Lead', desc: 'Strategic sourcing, complex RFP negotiation, contracting, and supplier relationship management.' },
  { id: 'finance', title: 'Finance & Commercial Controller', desc: 'Spend controls, TCO modeling, working capital, savings verification, and DOA compliance.' },
  { id: 'compliance', title: 'Audit & Compliance Officer', desc: 'Procurement file completeness, SOX 404 segregation of duties, and vendor risk auditing.' }
];

PS.USER_TRACKS = [
  { id: 'academy', label: 'Academy Learner', desc: 'Prioritize structured learning modules, thinking points, and knowledge checks.' },
  { id: 'operations', label: 'Operational Practitioner', desc: 'Prioritize daily execution tools: SOPs, calculators, checklists, and templates.' }
];

PS.user = {
  _cache: null,

  getProfile: function () {
    if (this._cache) return this._cache;
    var def = {
      name: 'Procurement Specialist',
      role: 'beginner',
      track: 'academy',
      company: '',
      avatarBg: '#4f46e5',
      joinedDate: PS.dateStr()
    };
    var stored = PS.store.get(PS.K.user, null);
    if (!stored || typeof stored !== 'object') {
      this._cache = def;
      return def;
    }
    this._cache = {
      name: stored.name || def.name,
      role: stored.role || def.role,
      track: stored.track || def.track,
      company: stored.company || '',
      avatarBg: stored.avatarBg || def.avatarBg,
      joinedDate: stored.joinedDate || def.joinedDate
    };
    return this._cache;
  },

  getInitials: function (name) {
    if (!name) return 'PS';
    var parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  },

  getRoleMeta: function (roleId) {
    var r = PS.USER_ROLES.filter(function (x) { return x.id === roleId; })[0];
    return r || PS.USER_ROLES[0];
  },

  getTrackMeta: function (trackId) {
    var t = PS.USER_TRACKS.filter(function (x) { return x.id === trackId; })[0];
    return t || PS.USER_TRACKS[0];
  },

  saveProfile: function (patch) {
    var current = this.getProfile();
    var updated = {};
    Object.keys(current).forEach(function (k) { updated[k] = current[k]; });
    Object.keys(patch || {}).forEach(function (k) { updated[k] = patch[k]; });
    
    this._cache = updated;
    PS.store.set(PS.K.user, updated);
    
    // Sync company name to general preferences if provided
    if (patch && patch.company !== undefined) {
      PS.savePrefs({ orgName: patch.company }, true);
    }
    
    this.updateTopbar();
    if (PS.buildNav && PS.routeMeta && PS.routeMeta.name !== 'home') {
      PS.buildNav();
    }
    PS.audit('user-profile-updated', updated.name + ' (' + updated.role + ')');
    
    // Re-render home page if currently active
    if (PS.routeMeta && PS.routeMeta.name === 'home') {
      PS.renderRoute();
    }
    return updated;
  },

  updateTopbar: function () {
    var prof = this.getProfile();
    var avatarEl = document.getElementById('userAvatarPill');
    var nameEl = document.getElementById('userNameLabel');
    if (avatarEl) {
      avatarEl.textContent = this.getInitials(prof.name);
      if (prof.avatarBg) avatarEl.style.backgroundColor = prof.avatarBg;
    }
    if (nameEl) {
      nameEl.textContent = prof.name || 'Account';
    }
  },

  openModal: function () {
    var self = this;
    var prof = self.getProfile();
    var academyStats = PS.academy ? PS.academy.getStats() : { completedCount: 0, totalCount: 16, pct: 0, badgesEarned: 0 };
    var savedCount = (PS.saved && PS.saved.list) ? PS.saved.list().length : 0;
    
    var roleOptions = PS.USER_ROLES.map(function (r) {
      return '<option value="' + PS.esc(r.id) + '"' + (prof.role === r.id ? ' selected' : '') + '>' +
        PS.esc(r.title) + '</option>';
    }).join('');

    var trackRadios = PS.USER_TRACKS.map(function (t) {
      var isChecked = prof.track === t.id;
      return '<label class="track-select-option' + (isChecked ? ' is-selected' : '') + '">' +
        '<input type="radio" name="modalUserTrack" value="' + PS.esc(t.id) + '"' + (isChecked ? ' checked' : '') + '> ' +
        '<div><strong>' + PS.esc(t.label) + '</strong><div class="t-dim t-xs">' + PS.esc(t.desc) + '</div></div>' +
        '</label>';
    }).join('');

    var body = '<div class="profile-modal-grid">' +
      '<div class="profile-avatar-banner">' +
      '<div class="profile-avatar-big" style="background:' + PS.esc(prof.avatarBg) + '">' +
      PS.esc(self.getInitials(prof.name)) + '</div>' +
      '<div><div class="t-lg font-bold">' + PS.esc(prof.name) + '</div>' +
      '<div class="t-dim t-sm">' + PS.esc(self.getRoleMeta(prof.role).title) + '</div>' +
      '<div class="t-xs t-mute mt4">Enterprise User Profile &middot; Single-Tenant Session</div></div>' +
      '</div>' +

      '<div class="stats-mini-row" style="margin:16px 0 10px; display:grid; grid-template-columns: repeat(3, 1fr); gap:8px;">' +
      '<div class="tile" style="padding:10px 12px; text-align:center;"><div class="t-lg font-bold text-accent">' + academyStats.completedCount + '/' + academyStats.totalCount + '</div><div class="t-xs t-dim">Functions Mastered</div></div>' +
      '<div class="tile" style="padding:10px 12px; text-align:center;"><div class="t-lg font-bold text-ok">' + academyStats.badgesEarned + '</div><div class="t-xs t-dim">Badges Earned</div></div>' +
      '<div class="tile" style="padding:10px 12px; text-align:center;"><div class="t-lg font-bold text-info">' + savedCount + '</div><div class="t-xs t-dim">Saved Works</div></div>' +
      '</div>' +

      '<div class="hub-jump-row mb16" style="display:flex; gap:8px; flex-wrap:wrap;">' +
      '<a class="btn btn-sm btn-ghost" href="#/home" onclick="PS.closeModal();">⌂ Command Center</a>' +
      '<a class="btn btn-sm btn-primary" href="#/academy" onclick="PS.closeModal();">🎓 Academy Curriculum &rarr;</a>' +
      '<a class="btn btn-sm" href="#/operations" onclick="PS.closeModal();" style="background:#0d9488; color:#fff; border-color:#0d9488;">💼 Operations Gateway &rarr;</a>' +
      '</div>' +

      '<form id="profileEditForm" onsubmit="event.preventDefault();">' +
      '<div class="field mb12">' +
      '<label class="label" for="profNameInput">Your Display Name</label>' +
      '<input class="input" type="text" id="profNameInput" value="' + PS.esc(prof.name) + '" required placeholder="e.g. Alex Morgan">' +
      '</div>' +
      
      '<div class="field mb12">' +
      '<label class="label" for="profRoleSelect">Your Procurement Role</label>' +
      '<select class="select" id="profRoleSelect">' + roleOptions + '</select>' +
      '</div>' +

      '<div class="field mb12">' +
      '<label class="label" for="profCompanyInput">Organization / Company (Optional)</label>' +
      '<input class="input" type="text" id="profCompanyInput" value="' + PS.esc(prof.company) + '" placeholder="e.g. Global Manufacturing Corp">' +
      '</div>' +

      '<div class="field mb8">' +
      '<label class="label">Primary Application Focus</label>' +
      '<div class="track-options-wrap">' + trackRadios + '</div>' +
      '</div>' +
      '</form>' +
      '</div>';

    PS.modal({
      title: 'Local User Account & Role Profile',
      body: body,
      okLabel: 'Save Profile & Apply',
      cancelLabel: 'Cancel',
      wide: true,
      onOk: function () {
        var nameInput = document.getElementById('profNameInput');
        var roleSelect = document.getElementById('profRoleSelect');
        var compInput = document.getElementById('profCompanyInput');
        var trackRadio = document.querySelector('input[name="modalUserTrack"]:checked');

        var newName = nameInput ? nameInput.value.trim() : prof.name;
        var newRole = roleSelect ? roleSelect.value : prof.role;
        var newComp = compInput ? compInput.value.trim() : prof.company;
        var newTrack = trackRadio ? trackRadio.value : prof.track;

        self.saveProfile({
          name: newName || 'Procurement Specialist',
          role: newRole,
          company: newComp,
          track: newTrack
        });
        PS.toast('User profile saved successfully.');
      }
    });
  }
};

/* Wire profile button in topbar on boot */
PS.acts = PS.acts || {};
PS.acts['user-profile-open'] = function () {
  PS.user.openModal();
};
