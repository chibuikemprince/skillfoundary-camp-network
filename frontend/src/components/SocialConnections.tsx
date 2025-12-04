import React from 'react';
import { Link2, Shield, Loader2, ExternalLink } from 'lucide-react';
import {
  useAuthState,
  useSocials,
  useLinkSocials,
  useModal,
} from '@campnetwork/origin/react';

type PlatformId = 'twitter' | 'discord' | 'spotify';

const envVars = import.meta.env as Record<string, string | undefined>;
const originClientId =
  envVars.VITE_ORIGIN_CLIENT_ID ||
  envVars.REACT_APP_ORIGIN_CLIENT_ID ||
  '';
const originConfigured = Boolean(originClientId && originClientId !== 'camp-demo-client-id');

const PLATFORM_COPY: Record<
  PlatformId,
  { label: string; blurb: string; cta: string; unlinkCta: string }
> = {
  twitter: {
    label: 'Twitter',
    blurb: 'Share milestones and verifiable learning wins.',
    cta: 'Link Twitter',
    unlinkCta: 'Unlink Twitter',
  },
  discord: {
    label: 'Discord',
    blurb: 'Join community channels with verified progress.',
    cta: 'Link Discord',
    unlinkCta: 'Unlink Discord',
  },
  spotify: {
    label: 'Spotify',
    blurb: 'Connect playlists and focus sessions to your journey.',
    cta: 'Link Spotify',
    unlinkCta: 'Unlink Spotify',
  },
};

const SocialConnections: React.FC = () => {
  const { authenticated, loading: authLoading } = useAuthState();
  const { data, isLoading, error, refetch } = useSocials();
  const {
    linkTwitter,
    linkDiscord,
    linkSpotify,
    unlinkTwitter,
    unlinkDiscord,
    unlinkSpotify,
  } = useLinkSocials();
  const { openModal } = useModal();

  const handleOpenCamp = () => {
    if (!originConfigured) {
      alert('Origin SDK client ID missing. Set VITE_ORIGIN_CLIENT_ID (or REACT_APP_ORIGIN_CLIENT_ID) in the frontend env.');
      return;
    }
    openModal();
  };

  const linkingMap: Record<PlatformId, () => void | Promise<void>> = {
    twitter: () => linkTwitter(),
    discord: () => linkDiscord(),
    spotify: () => linkSpotify(),
  };

  const unlinkingMap: Record<PlatformId, () => Promise<void>> = {
    twitter: () => unlinkTwitter(),
    discord: () => unlinkDiscord(),
    spotify: () => unlinkSpotify(),
  };

  const linkedStates = data || {};

  const handleToggle = async (platform: PlatformId, linked: boolean) => {
    if (linked) {
      await unlinkingMap[platform]();
    } else {
      await linkingMap[platform]();
    }
    await refetch();
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Link2 className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Social Connections</h3>
          </div>
          <button
            onClick={handleOpenCamp}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-primary-600 bg-primary-100 hover:bg-primary-200 disabled:opacity-60"
            disabled={!originConfigured}
          >
            Manage in Camp
          </button>
        </div>

        <div className="mb-5 p-4 bg-blue-50 rounded-lg border border-blue-200 flex items-start gap-3">
          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">Camp Network verified credentials</p>
            <p className="text-xs text-blue-700">
              Link socials through Origin SDK to anchor your SkillFoundry progress to Camp’s Auth Hub.
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleOpenCamp}
                className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
                disabled={!originConfigured}
              >
                Open Camp Connect
              </button>
              <a
                href="https://docs.camp.network"
                target="_blank"
                rel="noreferrer"
                className="flex items-center text-xs text-blue-800 hover:text-blue-900"
              >
                Docs <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {authLoading || isLoading ? (
          <div className="flex items-center justify-center py-6 text-gray-500 text-sm">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Loading social state...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {(Object.keys(PLATFORM_COPY) as PlatformId[]).map((platform) => {
              const copy = PLATFORM_COPY[platform];
              const linked = Boolean((linkedStates as any)[platform]);

              return (
                <div
                  key={platform}
                  className={`p-4 rounded-lg border ${linked ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{copy.label}</p>
                      <p className="text-xs text-gray-500">{copy.blurb}</p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        linked ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {linked ? 'Linked' : 'Not linked'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleToggle(platform, linked)}
                    className={`mt-3 w-full text-sm font-medium px-3 py-2 rounded ${
                      linked
                        ? 'text-red-700 bg-red-100 hover:bg-red-200'
                        : 'text-white bg-primary-600 hover:bg-primary-700'
                    }`}
                    disabled={!authenticated}
                  >
                    {authenticated ? (linked ? copy.unlinkCta : copy.cta) : 'Connect Camp to link'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {error && (
          <p className="text-xs text-red-600 mt-3">
            Unable to load Camp social links. Try reopening Camp Connect.
          </p>
        )}
        {!originConfigured && (
          <p className="text-xs text-amber-700 mt-3 bg-amber-50 border border-amber-200 rounded px-3 py-2">
            Origin SDK client ID not set. Add VITE_ORIGIN_CLIENT_ID (or REACT_APP_ORIGIN_CLIENT_ID) to your frontend
            environment so the Camp modal can initialize.
          </p>
        )}
      </div>
    </div>
  );
};

export default SocialConnections;
